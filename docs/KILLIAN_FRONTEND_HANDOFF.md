# Frontend handoff — Killian (KAN-18)

## What this part covers
- A step-by-step web interface: generate key → encrypt → receive → test defenses → compare Caesar cipher.
- Demo navigation, progress checklist, local-server indicator, sample message, character count, and receiver-tab link.
- Plain-English explanations for the wrong-key test, tampered ciphertext, and Caesar brute force.
- Responsive layout and keyboard-friendly controls.

## Files for this part
- `public/index.html` — page layout and demo walkthrough
- `public/styles.css` — styles, status indicators, mobile layout
- `public/app.mjs` — frontend actions, progress states and API integration

The actual source files are packaged separately as **Killian_Frontend_Files_Only.zip** in the project chat. They must still be uploaded to this branch.

## How to integrate without overwriting the team
- Luke owns `public/crypto-core.mjs` (key/encryption logic).
- David owns `server.cjs` (local API/storage).
- Eric owns the security test results and attack demo checks.
- Killian owns the three frontend files listed above.
- If your repo doesn't have the backend and crypto files yet, use the **CipherSafe_Killian_Frontend_Ready.zip** starter from the project chat to get a runnable baseline, then review each teammate's contributions before merging.

## Run the demo
1. Install Node.js 20+ and open the project folder.
2. Run `npm start`, then visit `http://127.0.0.1:8787`.
3. Generate a key, use a sample message, encrypt, and inspect the saved record.
4. Open a second tab; enter the same key; decrypt the message.
5. Try the wrong key and tampering tests.
6. Run the 26 Caesar key attempts.
7. Run `npm test` and capture screenshots for the report.

## Test status
- Six existing automated crypto/server tests passed locally on November 19, 2026.
- `node --check public/app.mjs` passed.
- Automated visual browser testing was blocked by the local tool environment. The group must manually click through the UI on their laptop before marking KAN-18 **Done**.

## Key limitations
Localhost education demo only; no accounts or secure key exchange. Do not use real secrets, and do not call the demo production-secure messaging.
