import { GasHttpClient } from "../gas-telegram-bot-api/src/GasHttpClient";
import { Logger } from "../gas-telegram-bot-api/src/Logger";
import { Database } from "./Database";
import { TelegramBot } from "../gas-telegram-bot-api/src/TelegramBot";
import { LeminoApp } from "./LeminoApp";
import { DEFAULT_RETRY, DEFAULT_RETRY_SLEEP_SEC, IS_LOGGER_DEBUG_MODE } from "./constants";
import { TG_RECIPIENT } from "./tg_recipients";

export const logger = new Logger({ debug: IS_LOGGER_DEBUG_MODE });
const database = new Database('script');
const httpClient = new GasHttpClient(logger, DEFAULT_RETRY_SLEEP_SEC);
const tg = new TelegramBot({ max_retry: DEFAULT_RETRY, retry_second: DEFAULT_RETRY_SLEEP_SEC, logger, httpClient });

(<any>global).main = async () => {
  const programs = [
    { id: "b101acb", name: "そこ曲がったら、櫻坂？" },
    { id: "b101b65", name: "ちょこさく" },
  ];

  const apps = programs.map(program => new LeminoApp({
    id: program.id,
    app_name: "lemino",
    httpClient: httpClient,
    database: database,
    logger: logger,
    max_retry: DEFAULT_RETRY,
    default_fetch_blob: true,
    send_raw_media: true,
    metadata: {},
  }));

  const messages = [];
  for (const app of apps) {
    const message = await app.getMessages();
    messages.push(...message);
  }

  for (const message of messages) {
    await message.sendToAllRecipients(TG_RECIPIENT);
    (<LeminoApp>message.app).setPublishRecord(message);
  }
}
