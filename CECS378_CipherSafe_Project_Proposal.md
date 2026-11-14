# CECS 378 — CipherSafe Project Proposal

**Project:** CipherSafe: Encrypted Messaging and Security Demonstration  
**Course:** CECS 378  
**Team Members:** Luke Alegre, Killian Nguyen, David Rincon, Eric To  
**Project Due Date:** November 20, 2026

## 1. Project Overview

For our CECS 378 semester project, we propose building **CipherSafe**, a locally hosted web application that demonstrates how encrypted messages can be stored, shared, and protected from unauthorized reading or modification.

Users will be able to enter a message, encrypt it with a generated key, and save the encrypted version to a local server. A second browser tab can retrieve the message and decrypt it using the same key. We will also demonstrate what happens when someone attempts to decrypt a message with the wrong key or changes the encrypted data.

The goal is not to invent a new encryption algorithm. Instead, we will develop our own application around **AES-256-GCM**, an established authenticated-encryption method, and use a controlled attack simulation to explain its security benefits.

## 2. Project Objectives

- Build a working encryption and decryption website using AES-256-GCM.
- Store encrypted messages on a local server without saving the original message or encryption key.
- Demonstrate successful decryption using the correct shared key.
- Show how the system responds to an incorrect key or modified ciphertext.
- Compare modern encryption with a basic Caesar cipher to show why weak encryption is easier to break.
- Document our design, testing results, limitations, and each member's contributions.

## 3. Planned Features

| Feature | What it does |
| --- | --- |
| Message encryption | Converts readable messages into ciphertext using AES-256-GCM. |
| Key generation | Creates a random encryption key for the demo. |
| Local message storage | Saves encrypted messages and necessary metadata on a local server. |
| Message decryption | Restores the original message when the correct key is provided. |
| Wrong-key test | Shows that decryption fails with an incorrect key. |
| Tampering test | Shows that modified encrypted data fails the authentication check. |
| Caesar cipher demonstration | Tries all 26 possible shifts to illustrate a weakness of a simple cipher. |

**Possible addition, if time permits:** A small dashboard summarizing the demo's successful and failed operations. This would show results from our test interactions, not real-world intrusion detection.

## 4. How the System Will Work

1. A user enters a message in the website.
2. The browser generates or uses a shared key and encrypts the message.
3. The website sends **only the encrypted message and required metadata** to the local server.
4. The server saves the encrypted data and makes it available for retrieval.
5. A user with the same key can retrieve and decrypt the message in another browser tab.
6. The group demonstrates failed decryption with the wrong key, rejected tampered data, and a Caesar cipher brute-force comparison.

**Planned tools:** HTML, CSS, JavaScript, the browser Web Crypto API, Node.js, GitHub, and Jira. The system will run locally on `127.0.0.1`, rather than on a public network.

## 5. Proposed Team Responsibilities

| Member | Main responsibility |
| --- | --- |
| **Luke Alegre** | Encryption/decryption functions, key generation, and explanation of AES-GCM. |
| **David Rincon** | Local server, encrypted-message storage, and backend testing. |
| **Eric To** | Caesar cipher demonstration, wrong-key/tampering tests, and security findings. |
| **Killian Nguyen** | Website interface, integration support, task coordination, and final document organization. |

These roles are **proposed** and can be adjusted based on the team's preferences. Everyone will help test the completed application, document their contributions, and participate in the presentation.

## 6. Expected Deliverables

- A working, locally hosted CipherSafe application with source code on GitHub.
- A documented encryption/decryption workflow and security demonstration.
- Test results covering successful decryption, incorrect keys, tampering, and Caesar cipher brute force.
- A report of **at least five pages**, excluding the cover page, references, and appendices, plus a detailed record of each member's contributions.
- A **10–15 minute** group presentation, followed by **5 minutes for questions**.
- A separately scheduled live demonstration with the professor outside class time, attended by all four team members.

## 7. Scope and Limitations

CipherSafe is an **educational prototype**, not a production messaging platform. It will not include public-network messaging, user authentication, secure key exchange, or multi-user account management. Both browser tabs will simulate the sender and receiver on the same computer.

Anyone who obtains the shared key could decrypt the messages. The demo does not prevent all access to stored records, and it does not prove the sender's identity. We will be clear about these limitations in our report and presentation. All attack demonstrations will use our own local test data; no attacks will be deployed against outside systems.

## 8. Expected Outcome

By the end of the project, we aim to demonstrate a working application that makes encryption concepts easier to understand through hands-on testing. Our presentation will show not only how messages are encrypted and decrypted, but also how weak encryption can be broken and how authenticated encryption can detect incorrect keys and tampering.

The final focus will be on **a reliable demonstration, clear security analysis, and meaningful contributions from all four team members**.
