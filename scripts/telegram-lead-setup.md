# Website lead alerts in Telegram

The receiver in `website-offer-leads.gs` writes a valid new lead to the `Website Leads` sheet, then sends one Telegram message. Duplicate form requests with the same request ID do not send another message. A Telegram error does not change the form's saved-lead result.

1. In Telegram, create a private bot with [@BotFather](https://t.me/BotFather). Open the new bot on the iPhone and send `/start`.
2. In the Google Apps Script project that serves `/website-offer/`, open **Project Settings → Script Properties**. Add `TELEGRAM_BOT_TOKEN`. Keep the bot token out of GitHub, the website, and chat messages.
3. Replace `Code.gs` with `website-offer-leads.gs` and save. Select and run `logTelegramChatIds` in the editor. The execution log shows the numeric private chat ID after you send `/start` to the bot. Add it as `TELEGRAM_CHAT_ID` in Script Properties.
4. Use **Deploy → Manage deployments → Edit → New version → Deploy**. Keep the existing web app URL and access settings. Authorize `UrlFetchApp` if Google asks, so the script can call Telegram.
5. Run `sendTelegramTest` in the Apps Script editor to check the iPhone notification without adding a test row to the Sheet. Then submit one non-customer form lead to confirm the full flow and remove that test row afterwards.

The bot sends a normal audible notification (`disable_notification: false`). To make it use a Shopify-like sound on iPhone, add your own short sound clip to Telegram and assign it to this bot's chat in **Notifications and Sounds**. Telegram supports custom tones shorter than five seconds and at most 300 KB. The bot API does not choose the recipient's notification tone.
