# CECS 378 - CipherSafe

**Team:** Luke Alegre, Killian Nguyen, David Rincon, Eric To  
**Due:** November 20, 2026

## Project idea
A localhost-only encrypted message demo. Users encrypt messages with AES-256-GCM, store the encrypted data, and decrypt with the same shared key. The demo also compares a weak Caesar cipher with modern encryption and tests wrong-key and tampered-message failures.

## Main deliverables
- **Encryption:** generate a key, encrypt and decrypt test messages (Luke)
- **Backend:** local server and encrypted-message storage (David)
- **Security demo:** Caesar cipher comparison, wrong-key and tampering tests (Eric)
- **Frontend:** easy-to-use website and integration (Killian)
- **Testing:** automated and manual test results (everyone)
- **Report:** 5+ pages plus a separate team contribution page (everyone)
- **Presentation:** 10–15 minutes, everyone participates (everyone)
- **Instructor demo:** separate appointment, everyone attends

## Suggested folder structure
```text
public/          # Website, encryption module, and browser logic
server.cjs       # Local server
test.mjs        # Automated tests
 docs/           # Screenshots, report, presentation, contribution notes
```

## Working plan
**Work Day 1:** confirm roles, build/review main components, integrate and test the app.

**Work Day 2:** record test results, finish the report/slides, and rehearse the demo.

## Group decisions still open
- Keep it localhost-only (recommended) or add more networking?
- Add a simple results dashboard only if the core demo works?
