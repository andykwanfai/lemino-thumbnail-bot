import { BotMap } from "./ITelegramRecipient";
import { BOT_TOKEN } from "./bot_tokens";

export const TG_BOT: BotMap = {
  DEFAULT: {
    name: "lemino_thumbnail_bot",
    token: BOT_TOKEN.DEFAULT,
    is_default: true,
  },
}