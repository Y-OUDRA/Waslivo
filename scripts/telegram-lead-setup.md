# Website lead alerts in Telegram

The receiver in `website-offer-leads.gs` writes each valid lead to its lead sheet and queues its Telegram notification. The form is confirmed as soon as the lead and queue entry are saved; the one-minute worker sends queued notifications and retries failures up to five times. Duplicate form requests with the same request ID do not create another row or alert.

1. In Telegram, create a private bot with [@BotFather](https://t.me/BotFather). Open the new bot on the iPhone and send `/start`.
2. In the Google Apps Script project that serves `/website-offer/`, open **Project Settings → Script Properties**. Add `TELEGRAM_BOT_TOKEN`. Keep the bot token out of GitHub, the website, and chat messages.
3. Replace `Code.gs` with `website-offer-leads.gs` and save. Select and run `logTelegramChatIds` in the editor. The execution log shows the numeric private chat ID after you send `/start` to the bot. Add it as `TELEGRAM_CHAT_ID` in Script Properties.
4. Select `installTelegramQueueWorker` in the Apps Script editor and run it once. Approve the time-driven trigger permission. This creates one background worker that checks the queue every minute.
5. Use **Deploy → Manage deployments → Edit → New version → Deploy**. Keep the existing web app URL and access settings. Authorize `UrlFetchApp` if Google asks, so the worker can call Telegram.
6. Run `sendTelegramTest` in the Apps Script editor to check the iPhone notification without adding a test row to the Sheet. Then submit one non-customer form lead to confirm the full flow and remove that test row afterwards.

The bot sends a normal audible notification (`disable_notification: false`). To make it use a Shopify-like sound on iPhone, add your own short sound clip to Telegram and assign it to this bot's chat in **Notifications and Sounds**. Telegram supports custom tones shorter than five seconds and at most 300 KB. The bot API does not choose the recipient's notification tone.
