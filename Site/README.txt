
# Cartoon Smash - Landing (Option B: Server-side De-dupe)

## What's inside
- `index.html` – full site page with green "Notify Me" button, centered modal, and client → function submission.
- `netlify/functions/subscribe.mjs` – serverless function using **Netlify Blobs** to store emails and block duplicates (HTTP 409).
- `package.json` – adds `@netlify/blobs` dependency (required by the function).

## Deploy steps (Netlify)
1. Download this folder as a zip and extract.
2. On Netlify: **Add new site → Deploy manually** (or connect to Git). Upload the entire folder.
   - If using Git, push the folder to a repo and connect it.
3. Visit your site and click **Notify Me** → submit email. 
   - First time → shows success.
   - Try same email again → shows “You’re already subscribed”.

## Where are emails stored?
- In Netlify **Blobs** store named `subscribers`. You can access/export via Netlify UI or API.

## Bonus
- You can later integrate a real mailing tool (Mailchimp/ConvertKit). Those platforms auto-dedupe too.
