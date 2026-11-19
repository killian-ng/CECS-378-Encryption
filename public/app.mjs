import {
  generateSharedKey, aesEncrypt, aesDecrypt, caesarEncrypt, tamperCiphertext,
} from './crypto-core.mjs';
import {crackCaesar} from './caesar-attack.mjs';
import {runIvReuseDemo} from './iv-reuse-attack.mjs';

const $ = id => document.getElementById(id);
let savedMessages = [];
const completed = new Set();
function markProgress(step) {
  completed.add(step);
  const badge = $(`progress-${step}`);
  if (badge) {
    badge.classList.add('complete');
    badge.setAttribute('aria-label', `${badge.textContent}, completed`);
  }
}
function updateCharacterCount() {
  $('charCount').textContent = `${$('plaintext').value.length} / 3000 characters`;
}
function setServerStatus(connected) {
  const indicator = $('serverStatus');
  indicator.textContent = connected ? '● Server connected' : '● Cannot reach server';
  indicator.className = `status-pill ${connected ? 'online' : 'offline'}`;
}
const show = (id, message, kind = '') => {
  $(id).textContent = message;
  $(id).className = `feedback ${kind}`;
};
async function api(path, options) {
  const response = await fetch(path, options);
  let json;
  try { json = await response.json(); }
  catch { throw new Error(`Server response error (${response.status})`); }
  if (!response.ok) throw new Error(json.error || `HTTP ${response.status}`);
  return json;
}
const post = (path, body) => api(path, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(body),
});
function selectedMessage() {
  if (!savedMessages.length) throw new Error('Encrypt and save a message first.');
  return savedMessages[0];
}
function renderMessages() {
  const list = $('messageList');
  list.replaceChildren();
  if (!savedMessages.length) {
    const empty = document.createElement('p');
    empty.className = 'muted';
    empty.textContent = 'No saved messages yet. Try encrypting one above.';
    list.append(empty);
    return;
  }
  for (const record of savedMessages) {
    const item = document.createElement('div');
    item.className = 'record';
    const label = document.createElement('div');
    label.className = 'recordHead';
    const time = new Date(record.createdAt).toLocaleTimeString();
    label.textContent = `Saved message · ${time}`;
    const cipher = document.createElement('code');
    cipher.className = 'cipher';
    cipher.textContent = record.ciphertext.length > 100 ? record.ciphertext.slice(0, 100) + '…' : record.ciphertext;
    const button = document.createElement('button');
    button.className = 'button secondary small';
    button.textContent = 'Decrypt message';
    button.addEventListener('click', async () => {
      try {
        if (!$('sharedKey').value.trim()) throw new Error('Paste the shared key first.');
        const plaintext = await aesDecrypt(record, $('sharedKey').value);
        show('decryptResult', `Message decrypted: ${plaintext}`, 'good');
        markProgress('receive');
      } catch (error) {
        show('decryptResult', `Could not decrypt: ${error.message}`, 'bad');
      }
    });
    item.append(label, cipher, button);
    list.append(item);
  }
}
async function refresh() {
  let messages;
  try { ({messages} = await api('/api/messages')); }
  catch (error) { setServerStatus(false); throw error; }
  savedMessages = messages;
  setServerStatus(true);
  $('count').textContent = `${messages.length} encrypted record${messages.length === 1 ? '' : 's'}`;
  $('rawServerData').textContent = JSON.stringify({messages}, null, 2);
  renderMessages();
}
$('generateKey').addEventListener('click', () => {
  $('sharedKey').value = generateSharedKey();
  markProgress('key');
  show('keyFeedback', 'Key is ready. Copy it if you want to decrypt the message in another tab. The key stays in the browser.', 'good');
});
$('sharedKey').addEventListener('input', () => { if ($('sharedKey').value.trim()) markProgress('key'); });
$('copyKey').addEventListener('click', async () => {
  try {
    if (!$('sharedKey').value.trim()) throw new Error('Generate a key first.');
    await navigator.clipboard.writeText($('sharedKey').value.trim());
    show('keyFeedback', 'Key copied. Paste it into the other tab when you want to decrypt.', 'good');
  } catch (error) { show('keyFeedback', error.message, 'bad'); }
});
$('toggleKey').addEventListener('click', () => {
  const input = $('sharedKey');
  input.type = input.type === 'password' ? 'text' : 'password';
  $('toggleKey').textContent = input.type === 'password' ? 'Show' : 'Hide';
});
$('plaintext').addEventListener('input', updateCharacterCount);
$('fillSample').addEventListener('click', () => {
  $('plaintext').value = 'Meet at the library at 3 PM. Bring our CECS 378 notes.';
  updateCharacterCount();
  $('plaintext').focus();
});
$('saveMessage').addEventListener('click', async () => {
  try {
    const message = $('plaintext').value;
    const envelope = await aesEncrypt(message, $('sharedKey').value);
    await post('/api/messages', envelope);
    $('plaintext').value = '';
    updateCharacterCount();
    markProgress('send');
    show('sendFeedback', 'Message encrypted and saved. The server only received the encrypted data, not your message or key.', 'good');
    await refresh();
  } catch (error) { show('sendFeedback', `Error: ${error.message}`, 'bad'); }
});
$('refreshMessages').addEventListener('click', async () => {
  try { await refresh(); show('decryptResult', 'Saved messages updated.', 'good'); }
  catch (error) { show('decryptResult', error.message, 'bad'); }
});
$('wrongKey').addEventListener('click', async () => {
  try {
    const message = selectedMessage();
    const randomKey = generateSharedKey();
    await aesDecrypt(message, randomKey);
    show('attackResult', 'Something is wrong: the wrong key still decrypted the message.', 'bad');
  } catch (error) {
    if (error.message.includes('Encrypt and save')) show('attackResult', error.message, 'bad');
    else { show('attackResult', 'Wrong key did not work. AES-GCM rejected the decryption.', 'good'); markProgress('attack'); }
  }
});
$('tamper').addEventListener('click', async () => {
  let message;
  try {
    message = selectedMessage();
    await aesDecrypt(message, $('sharedKey').value); // check that the original message can be read first
  } catch {
    return show('attackResult', 'Save a message and enter the correct key before testing this.', 'bad');
  }
  try {
    const damaged = tamperCiphertext(message); // change a copy so the saved message stays the same
    await aesDecrypt(damaged, $('sharedKey').value);
    show('attackResult', 'Something is wrong: the changed message still decrypted.', 'bad');
  } catch {
    show('attackResult', 'Tampering detected. AES-GCM rejected the changed encrypted data.', 'good');
    markProgress('attack');
  }
});
$('runCaesar').addEventListener('click', () => {
  const plaintext = $('caesarInput').value;
  if (!plaintext.trim()) return show('caesarFeedback', 'Enter a message to try the Caesar cipher.', 'bad');
  // Pick a random secret shift (1-25). The attack below never looks at it.
  const secretShift = 1 + Math.floor(Math.random() * 25);
  const ciphertext = caesarEncrypt(plaintext, secretShift);
  $('caesarCipher').textContent = ciphertext;
  const {attempts, best} = crackCaesar(ciphertext); // attacker only sees the ciphertext
  const list = $('caesarAttempts');
  list.replaceChildren();
  for (const {shift: guess, plaintext: candidate} of attempts) {
    const row = document.createElement('div');
    row.className = 'attempt';
    if (guess === best.shift) row.classList.add('found');
    const shiftLabel = document.createElement('strong');
    shiftLabel.textContent = `Shift ${String(guess).padStart(2,'0')}`;
    const content = document.createElement('span');
    content.textContent = candidate;
    row.append(shiftLabel, content);
    list.append(row);
  }
  if (best.shift === secretShift) {
    show('caesarFeedback', `We tried all 26 shifts. Letter-frequency analysis picked shift ${best.shift}, and that was the real secret shift. The attacker never needed the key.`, 'good');
  } else {
    show('caesarFeedback', `We tried all 26 shifts. Frequency analysis guessed shift ${best.shift}, but the real shift was ${secretShift}. Short messages don't have enough letters for statistics, but a person can still read the 26 lines and find it.`, 'bad');
  }
});
async function ivDemo(reuseIv) {
  const known = $('ivKnown').value;
  const secret = $('ivSecret').value;
  if (!known.trim() || !secret.trim()) return show('ivFeedback', 'Fill in both messages first.', 'bad');
  try {
    const result = await runIvReuseDemo(known, secret, reuseIv);
    $('ivRecordA').textContent = `IV: ${result.known.iv}\nciphertext: ${result.known.ciphertext}`;
    $('ivRecordB').textContent = `IV: ${result.secret.iv}\nciphertext: ${result.secret.ciphertext}`;
    $('ivRecovered').textContent = result.recovered || '(nothing)';
    $('ivDetails').hidden = false;
    if (reuseIv && result.success) {
      const note = result.partial ? ' (only as far as Message A is long)' : '';
      show('ivFeedback', `Attack worked: both records share the same IV, so the attacker recovered Message B${note} without the key.`, 'bad');
    } else if (!reuseIv && !result.success) {
      show('ivFeedback', 'Attack failed: each record has a different IV, so XORing them only gives garbage. This is what CipherSafe does.', 'good');
    } else {
      show('ivFeedback', 'Unexpected result. Check the recovered text below.', 'bad');
    }
  } catch (error) { show('ivFeedback', `Error: ${error.message}`, 'bad'); }
}
$('ivBroken').addEventListener('click', () => ivDemo(true));
$('ivSafe').addEventListener('click', () => ivDemo(false));
$('resetDemo').addEventListener('click', async () => {
  if (!window.confirm('Clear all saved demo messages?')) return;
  try { await post('/api/reset', {}); await refresh(); show('decryptResult', 'Saved messages cleared.', 'good'); }
  catch (error) { show('decryptResult', error.message, 'bad'); }
});
updateCharacterCount();
try { await refresh(); }
catch (error) { setServerStatus(false); show('sendFeedback', `Cannot connect to the server: ${error.message}. Make sure npm start is running.`, 'bad'); }
