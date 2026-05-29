# Paladin — Learn History ⚜️

> Learn history through interactive story-driven lessons, daily challenges, and an addictive progression system.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📖 **Narrative Lessons** | Story-driven micro-lessons (3-5 min) with branching choices |
| ❓ **Quizzes** | Post-lesson quizzes with explanations and scoring |
| ⭐ **XP & Levels** | Earn XP, level up, and watch your progress grow |
| 🌳 **Skill Tree** | Unlock eras — Ancient → Medieval → Modern |
| ⚔️ **Daily Challenge** | Timed 5-question challenge with streak multipliers |
| 🏆 **Leaderboard** | Compete with other players on the global rankings |
| 🔥 **Streak System** | Build daily streaks with bonus XP multipliers |
| 🔐 **Authentication** | Email/Password + Google Sign-In via Firebase |
| ☁️ **Cloud Sync** | LocalStorage-first with Firestore cloud backup |
| 📱 **PWA** | Installable on any device, works offline |

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES Modules)
- **Backend**: Firebase Authentication + Cloud Firestore
- **Offline**: Service Worker + localStorage
- **No build tools required!**

## 🚀 Quick Start (Local — No Firebase)

The app works fully offline with localStorage. No setup needed.

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/paladin-app.git
cd paladin-app

# Serve with any HTTP server
npx serve .
```

Open **http://localhost:3000** — that's it!

## ☁️ Setup with Firebase (Cloud Features)

### Step 1: Create Firebase Project
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project named "Paladin"
3. Enable **Authentication** → Email/Password + Google provider
4. Create a **Firestore** database (start in production mode)

### Step 2: Add Your Config
Open `js/firebase-config.js` and replace the placeholder values:

```js
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID'
};
```

### Step 3: Deploy Security Rules
```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules
```

### Step 4: Deploy to Firebase Hosting
```bash
firebase deploy --only hosting
```

## 📱 Play Store Deployment

1. Deploy to Firebase Hosting (get your URL)
2. Use [PWABuilder](https://pwabuilder.com) to wrap as TWA
3. Upload the AAB to Google Play Console

## 📁 Project Structure

```
Paladin App/
├── index.html              # SPA shell
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── firebase.json           # Hosting config
├── firestore.rules         # Security rules
├── css/
│   └── index.css           # Design system (50KB+)
├── js/
│   ├── app.js              # Entry point
│   ├── firebase-config.js  # Firebase init
│   ├── auth.js             # Auth service
│   ├── cloud-sync.js       # Firestore sync
│   ├── store.js            # State management
│   ├── router.js           # SPA router
│   ├── components/
│   │   ├── navbar.js       # Bottom tab bar
│   │   ├── toast.js        # Notifications
│   │   └── confetti.js     # Celebrations
│   ├── data/
│   │   ├── lessons.js      # 6 narrative lessons
│   │   ├── skillTree.js    # Era progression
│   │   └── dailyChallenges.js
│   └── screens/
│       ├── auth.js         # Login / Sign Up
│       ├── onboarding.js   # Name + Avatar
│       ├── home.js         # Dashboard
│       ├── lesson.js       # Narrative reader
│       ├── quiz.js         # Post-lesson quiz
│       ├── skillTree.js    # Skill tree
│       ├── daily.js        # Timed challenge
│       ├── leaderboard.js  # Rankings
│       └── profile.js      # Profile + Stats
└── assets/
    └── icons/              # PWA icons
```

## 🤝 Contributing

Pull requests welcome! Fork the repo, make your changes, and submit a PR.

## 📄 License

MIT © Paladin App
