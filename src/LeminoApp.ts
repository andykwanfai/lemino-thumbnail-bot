import { TelegramBot } from "../gas-telegram-bot-api/src/TelegramBot";
import { Utils } from "../gas-telegram-bot-api/src/Utils";
import { App, IApp, IPublishRecord } from "./App";
import { ChildResource, LeminoResponse } from "./interface.ts/LeminoResponse";
import { Message, MessageMedia, MessageMediaType } from "./MessageV2";

/**
 * wizard=the whole program e.g. ちょこさく
 * series=ちょこさく（2024年4月-6月配信分）
 * pit=single episode
 */
export enum LeminoResourceType {
  WIZARD = 0,
  SERIES = 1,
  PIT = 2,
}

export interface ILeminoPublishRecord extends IPublishRecord {
  wizard_update_date: string;
  sent_series_banner: string;
}

const DEFAULT_PUBLISH_RECORD: ILeminoPublishRecord = {
  last_published_at: -1,
  last_published_id: -1,
  wizard_update_date: '1970-01-01T00:00:00Z',
  sent_series_banner: '',
}

export class LeminoApp extends App {
  constructor(i: IApp) {
    super(i);
  }

  protected async fetchMessageData() {
    const result: ChildResource[] = [];
    const res = await this.fetch(`https://if.lemino.docomo.ne.jp/v1/meta/member?parent_filter=%7B%22crid%22:[%22crid://plala.iptvf.jp/group/${this.id}%22]%7D`, {});

    const json = Utils.parseJson(res.getContentText()) as LeminoResponse;

    result.push(json.parent_list[0]!);

    for (const child of json.parent_list[0]!.child_list) {
      const res = await this.fetch(`https://if.lemino.docomo.ne.jp/v1/meta/member?parent_filter=%7B%22crid%22:[%22${child.crid}%22]%7D`, {});

      const json = Utils.parseJson(res.getContentText()) as LeminoResponse;

      result.push(json.parent_list[0]!);
      result.push(...json.parent_list[0]!.child_list);
    }

    return result;
  }

  protected constructhMessages(res: ChildResource[]): Message[] {
    const tg = new TelegramBot({
      retry_second: this.httpClient.getRetrySecond(),
      logger: this.logger,
      httpClient: this.httpClient,
      max_retry: this.max_retry,
    });

    return res.map(resource => {
      let id, type, date, text;
      switch (resource.pit_git_type) {
        case 'WIZARD':
          id = resource.crid.replace('crid://plala.iptvf.jp/group/', '');
          type = LeminoResourceType.WIZARD;
          date = new Date(resource.update_date);
          text = resource.title;
          break;
        case 'SERIES':
          id = resource.crid.replace('crid://plala.iptvf.jp/group/', '');
          type = LeminoResourceType.SERIES;
          date = new Date(resource.entry_date);
          text = resource.title;
          break;
        case 'PIT':
          id = /#(\d+)/g.exec(resource.title)![1]!;
          type = LeminoResourceType.PIT;
          date = new Date(resource.display_start);
          text = resource.title + '\n' + resource.synopsis_info.synopsis;
          break;
        default:
          throw new Error(`unknown pit_git_type: ${resource.pit_git_type}`);
      }

      return new Message({
        id: id,
        date: date,
        app: this,
        tg: tg,
        metadata: { type: type },
        text: text,
        media: this.constructMedia(resource),
      });
    });
  }

  private constructMedia(resource: ChildResource) {
    const media: MessageMedia[] = [];

    resource.image_list.width.image_list_obj.forEach((image) => {
      media.push({
        type: MessageMediaType.PHOTO,
        media_url: `https://img.lemino.docomo.ne.jp${image.url}?width=3840&quality=100`,
      });
    });

    resource.image_list.height.image_list_obj.forEach((image) => {
      media.push({
        type: MessageMediaType.PHOTO,
        media_url: `https://img.lemino.docomo.ne.jp${image.url}?width=1920&quality=100`,
      });
    });

    return media;
  }


  protected filterMessages(messages: Message[]): Message[] {
    return messages.filter(message => !this.isMessagePublished(message));
  }

  public getPublishRecord() {
    const record = this.database.getProperty(this.id.toString()) as ILeminoPublishRecord ?? DEFAULT_PUBLISH_RECORD;
    return record;
  }

  public setPublishRecord(message: Message) {
    const record = this.getPublishRecord();

    switch (message.metadata['type']) {
      case LeminoResourceType.WIZARD:
        record.wizard_update_date = message.date.toISOString();
        break;
      case LeminoResourceType.SERIES:
        record.sent_series_banner = record.sent_series_banner.split(',').concat([message.id as string]).join(',');
        break;
      case LeminoResourceType.PIT:
        record.last_published_id = message.id;
        break;
      default:
        throw new Error(`unknown pit_git_type: ${message.metadata['type']}`);
    }

    this.database.setProperty(this.id.toString(), JSON.stringify(record));
  }

  public isMessagePublished(message: Message): boolean {
    const record = this.getPublishRecord();
    switch (message.metadata['type']) {
      case LeminoResourceType.WIZARD:
        return message.date <= new Date(record.wizard_update_date);
      case LeminoResourceType.SERIES:
        return record.sent_series_banner.split(',').includes(message.id as string);
      case LeminoResourceType.PIT:
        return parseInt(record.last_published_id as string) >= parseInt(message.id as string);
      default:
        throw new Error(`unknown pit_git_type: ${message.metadata['type']}`);
    }
  }

  protected sortMessages(messages: Message[]): Message[] {
    messages.sort((a, b) => {
      if (a.metadata['type'] !== b.metadata['type']) {
        return a.metadata['type'] - b.metadata['type'];
      }
      switch (a.metadata['type']) {
        case LeminoResourceType.PIT:
          return parseInt(a.id as string) - parseInt(b.id as string);
        case LeminoResourceType.WIZARD:
        case LeminoResourceType.SERIES:
          return a.date.getTime() - b.date.getTime();
        default:
          throw new Error(`unknown pit_git_type: ${a.metadata['type']}`);
      }
    });
    return messages;
  }
}