# lemino-thumbnail-bot
A telegram bot host on Google Apps Script to get the thumbnails from Lemino's episode

**1.** Install dependencies

```
pnpm install
```

**2.** Login to Google
```
pnpm clasp login
```

**3.** Add your configs
1. Add your script id in .clasp.json
2. telegram bot token in bot_token.ts
3. telegram recipients in tg_recipients.ts
4. lemino program id in fetch_settings.ts

**4.** Deploy
```
pnpm run deploy
```