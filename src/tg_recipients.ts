import { RecipientMap } from "./ITelegramRecipient";
import { TG_BOT } from "./tg_bots";

const SAKURA_SNS = "-1001950295814";
const HINATA_SNS = "-1001980146229";

// add recipients here to send by bot and chat other than default 
export const TG_RECIPIENTS: RecipientMap = {

  DEFAULT: [
  ],

  SAKURA_DEFAULT: [
    {
      bot: TG_BOT.DEFAULT,
      chat_id: SAKURA_SNS,
    }
  ],

  HINATA_DEFAULT: [
    {
      bot: TG_BOT.DEFAULT,
      chat_id: HINATA_SNS,
    }
  ],

  ERROR: [
    {
      bot: TG_BOT.DEFAULT,
      chat_id: "-1001815654786",
      topic: {
        OVERSIZE: "3760",
      }
    }
  ],

}