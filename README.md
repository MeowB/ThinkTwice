# 🧠 Cyberbullying Detection Chrome Extension – Development Workflow

## 📁 1. Project Setup
- [ ] Create project folder and file structure
- [ ] Set up `manifest.json` (Manifest V3)
- [ ] Create `popup.html`, `popup.js`, and `popup.css`
- [ ] Add basic icons for extension (icon16, icon48, icon128)
- [ ] Create `content.js` (script injected into webpages)
- [ ] (Optional) Create `background.js` for future background tasks

---

## 🔌 2. Perspective API Integration
- [ ] Sign up and get API key from [Perspective API](https://perspectiveapi.com/)
- [ ] Write a utility to send text to Perspective API
- [ ] Handle and parse API responses (e.g., TOXICITY, INSULT scores)
- [ ] Test API with hardcoded examples
- [ ] Implement error handling and rate limiting safeguards

---

## 🌐 3. DOM Interaction
- [ ] Use `content.js` to scan webpages for text input fields or comment sections
- [ ] Target platforms like Twitter, Reddit, YouTube, etc.
- [ ] Set up `MutationObserver` to detect dynamic content changes
- [ ] Extract user-generated content for analysis

---

## 🧠 4. Cyberbullying Detection Logic
- [ ] Send extracted text to DB and Perspective API in real-time
- [ ] Compare score to defined thresholds (e.g., TOXICITY > 0.8)
- [ ] Flag toxic content with warnings/visual cues
- [ ] Blur or hide toxic content (optional)
- [ ] Prevent users from submitting toxic messages (optional)
- [ ] Offer alternative suggestions or positive reinforcement (stretch goal)

---

## 🧩 5. Extension UI (Popup)
- [ ] Design a clean popup with title and status message
- [ ] Add a toggle switch to enable/disable the extension
- [ ] Add a dropdown to change sensitivity level
- [ ] Display recent toxic comment flags (optional)

---

## 🗃 6. Local Storage & Settings
- [ ] Use `chrome.storage.local` to store user preferences
- [ ] Load and apply settings on content script load
- [ ] Allow real-time changes through popup interface

---

## 🧪 7. Testing
- [ ] Test on major platforms (Reddit, Twitter, YouTube, Facebook)
- [ ] Test text with different levels of toxicity and slang
- [ ] Test toggle and sensitivity changes
- [ ] Handle unexpected inputs or non-English content gracefully

---

## 🎨 8. UI Polish & Optimization
- [ ] Improve styling for popup and warnings (CSS)
- [ ] Add animations or smooth transitions for alerts (optional)
- [ ] Add branded icon/logo (if desired)
- [ ] Minify and optimize files for production

---

## 🚀 9. Deployment
- [ ] Create `README.md` with usage, installation, and credits
- [ ] Create a short demo video or GIF (optional but recommended)
- [ ] Package the extension as a ZIP
- [ ] Submit to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
- [ ] Respond to any required reviews or permission requests

---

## 🛠️ Optional Stretch Features
- [ ] Dashboard for flagged content (parent/educator mode)
- [ ] Sentiment trend graph in popup
- [ ] Language support beyond English
- [ ] Community-based reporting
