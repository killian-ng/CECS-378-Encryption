# CipherSafe - Frontend Notes (KAN-18)

## What I worked on

I worked on the website part of CipherSafe. Since we only have two days to finish, I tried to keep everything simple so we can use it during the live demo without having to explain a bunch of extra steps.

The website goes in order: generate a key, encrypt a message, open another tab to decrypt it, and then try the wrong-key and tampering tests. I also added a sample message, a server connection indicator, and a section to check what gets saved on the server.

I kept the Caesar cipher example on the same page so we can compare the results.

## My files

- `public/index.html` - the website layout and buttons
- `public/styles.css` - colors, layout, and smaller-screen support
- `public/app.mjs` - button actions, message list, and server connection

Luke is working on the AES encryption part, David on the server, and Eric on the security tests. I kept those pieces separate so we can merge everyone's changes.

## Running it

1. Open the project folder in VS Code.
2. Make sure Node.js 20+ is installed.
3. Run `npm start` in the folder with `package.json`.
4. Go to `http://127.0.0.1:8787`.
5. Use `npm test` to run the automated checks.

## Still need to check

- [ ] Generate a key and copy it.
- [ ] Encrypt a sample message and check that it appears on the page.
- [ ] Open another tab and decrypt it with the same key.
- [ ] Try a different key. Decryption should fail.
- [ ] Change the encrypted data. It should fail too.
- [ ] Test all 26 Caesar shifts.
- [ ] Check that the server record doesn't contain the original message or key.
- [ ] Take screenshots and make sure the website looks okay in a smaller window.

The existing automated tests passed (6/6) on Nov 19, but we still need to check the buttons manually in a browser before saying this task is done.

## Before merging

The frontend source is in the **Killian_Frontend_Natural_Style.zip** file in our project chat. The full runnable version is **CipherSafe_Killian_Natural_Style.zip**. The starter also contains initial encryption and server files, so check with Luke and David before replacing their versions.

This is just a local school demo, not a real secure messaging service.
