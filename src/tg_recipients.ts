import { RecipientMap } from "./ITelegramRecipient";
import { TG_BOT } from "./tg_bots";

// add recipients here to send by bot and chat other than default 
export const TG_RECIPIENT: RecipientMap = {

  DEFAULT: [
    {
      bot: TG_BOT.DEFAULT,
      chat_id: "",
    }
  ],

  ERROR: [
    {
      bot: TG_BOT.DEFAULT,
      chat_id: "",
      topic: {
        OVERSIZE: "",
      }
    }
  ],
}