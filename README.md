# 💪 GymReco

**A mobile-first PWA workout tracker｜手機優先的健身紀錄 App**

> Log your workouts, build your exercise library, and track your progress — all stored locally on your device.

> 輕鬆紀錄訓練、管理動作庫、追蹤進度。資料全部存在你的手機本地端。

---

## ✨ Features｜功能

- 📋 Log workouts with weight, sets, reps, and session notes
- 📚 Personal exercise library with knowledge notes
- 📅 Training calendar overview
- 🌐 Bilingual interface (中文 / English)
- 💾 Data stored locally via localStorage — no account needed
- 📱 PWA + Service Worker — add to home screen, works offline

---

## 🚀 Try it now｜立即使用

Open with iPhone Safari or Android Chrome:

👉 **https://rubychenhaii.github.io/workout-tracker**

Then: **Share → Add to Home Screen** for full-screen experience.

> ☑️ App 中預設顯示之紀錄為範例資料，請放心將其刪除！
> The workout records shown by default are sample data. Feel free to delete them!

---

## 💾 資料儲存說明｜Data Storage Notice

‼️App 的所有資料儲存於**瀏覽器的 localStorage**，請注意以下情況會導致資料永久消失：

- 在瀏覽器設定中清除「網站資料」或「localStorage」
- 換手機或換瀏覽器（資料不會自動轉移）
- 重灌手機作業系統

> All data is stored in your **browser's localStorage**.
> Data will be permanently lost if you clear site data, switch devices, or reinstall your OS.

> v1.6.0: add JSON/CSV export and JSON import in About page. This may come in handy!

請善用「輸出為JSON」功能 (位於「關於」頁面)

---

## 🛠️ Local Development｜本機開發
```bash
git clone https://github.com/rubychenhaii/workout-tracker.git
cd workout-tracker
npm install
npm start
```

To deploy:
```bash
npm run deploy
```

---

## 📦 Tech Stack｜技術

- React 19
- PWA + Service Worker (offline support)
- localStorage (no backend required)
- Deployed via GitHub Pages
- Developed with help from Claude Sonnet 4.6

---

## 🤖 Development Story｜開發歷程

This app was built entirely through **conversational AI-assisted development** with Claude Sonnet 4.6, without writing a single line of code manually.

The development process unfolded across several days of iterative prompting:

**Day 1 — Prototype**
Starting from a simple idea — replacing an iPhone Notes workout log — the first React prototype was generated through a series of prompts describing the desired UI, data structure, and interaction patterns. Four versions were iterated in a single session, evolving from a dark aesthetic to a clean iOS-native style.

**Day 2 — Feature Expansion**
Through continued conversation, the app gained a full exercise library system with persistent knowledge notes, a training calendar, bilingual (zh/EN) support, and a bottom navigation bar. All UI decisions — including the symmetric icon-based nav and the colour token system — emerged from back-and-forth dialogue.

**Day 3 — Deployment & Polish**
The app was deployed to GitHub Pages as a PWA via step-by-step prompting through the entire toolchain: Node.js, Create React App, gh-pages, Git, and Netlify. Issues encountered along the way (JSON syntax errors, missing React imports, corrupted index.html from TextEdit) were all diagnosed and fixed through conversation.

**Day 4 — Hardening**
A collaborative security and functionality audit — including a comparison with a separate AI agent — surfaced and resolved 8 issues: ID collision risks, date sorting bugs, i18n gaps, routing issues, and iOS PWA incompatibilities with window.alert/confirm. All were fixed through targeted prompts.

**Day 5 and counting...**
Testing, debugging and so on...

> The entire codebase — from data architecture to UI components to deployment config — was produced through natural language conversation, with the human contributor acting as product owner, tester, and decision-maker throughout.

---

## 👤 Author｜作者

**Ruby Chen**
GitHub: [@rubychenhaii](https://github.com/rubychenhaii)

---

## 📄 License

MIT © 2026 Ruby Chen
