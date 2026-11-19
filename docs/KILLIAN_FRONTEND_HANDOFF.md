# CipherSafe - My Frontend Work (KAN-18)

## What I worked on

I took care of the website part of CipherSafe. Since we only have two days to work on the project, I wanted to keep the website simple enough that we can go through everything during our presentation without getting lost.

The page follows the same order as our demo: generate a key, encrypt a message, open another tab to decrypt it, and then test the wrong key and tampering. I also added a sample message button, a server connection status, and a way to see what the local server actually saves.

The Caesar cipher part is on the same page so we can compare the results without opening a different program.

## Files I worked on

- `public/index.html`: the actual page and buttons.
- `public/styles.css`: layout, colors, and mobile-friendly styling.
- `public/app.mjs`: connects the buttons to the encryption functions and the server.

I left the main AES code in `crypto-core.mjs` and the server in `server.cjs` separate because those are Luke's and David's parts. Eric can use the security-test section for his demonstration.

## Files my part depends on

`app.mjs` imports these files, which belong to other people. They need to be in `public/` for the website to run:
- `crypto-core.mjs`: AES-GCM and keys (Luke)
- `caesar-attack.mjs`: Caesar frequency attack (Eric)
- `iv-reuse-attack.mjs`: Step 6 IV-reuse attack (owner TBD)

`server.cjs` (David) also has to list them so the browser can load them.

## How to run it

1. Open the whole project folder in VS Code.
2. Make sure Node.js 20 or newer is installed.
3. Open a terminal in the folder with `package.json`.
4. Run `npm start`.
5. Open `http://127.0.0.1:8787` in the browser.
6. To run the automated tests, use `npm test` in another terminal.

## What we still need to check

- [ ] The page says the server is connected.
- [ ] Generate a key and copy it.
- [ ] Try the sample message and encrypt it.
- [ ] Check that an encrypted record shows up.
- [ ] Open another tab, paste the same key, and decrypt the message.
- [ ] Try a wrong key. It should fail.
- [ ] Change the encrypted data. It should also fail to decrypt.
- [ ] Run the Caesar cipher example and check all 26 shifts appear.
- [ ] Step 6: broken mode recovers Message B, CipherSafe mode shows garbage.
- [ ] Look at the stored record. The original message and key should not be there.
- [ ] Take screenshots and check the layout in a smaller browser window.

The automated tests passed (8/8) on November 19. We still need to click through the actual website on our computers to confirm everything works together. I don't want to mark the task finished before that.

## For the group

Luke can check the AES encryption and keys. David can check the API and saved records. Eric can check the wrong-key, tampering, and Caesar demonstrations. I'll help connect everything and make sure the website is ready when we present.

There are starter versions of the other modules in the full project ZIP so the website can run. We should compare them with everyone's latest work before merging anything into `main`.

## What I can say during the presentation

"For the website, I tried to make everything easy to follow. We start by generating a key, then type a message and encrypt it. The server only saves the encrypted version. After that, we open another tab with the same key to get the message back. We also have a section where we can test what happens with the wrong key or if someone changes the encrypted data."

**Note:** This is just a local classroom demo. We aren't building a real messaging service with user accounts or a secure way to share keys.
