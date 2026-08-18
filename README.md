<div align="center">

  <img src="public/cohort-logo_g04wy2.png" alt="Cohort Logo" width="90" height="90" />

  # 🎓 Cohort PCCOE
  ### *The Autonomous Student Ecosystem & Campus Network for PCCOE Pune*

  <p align="center">
    <a href="https://github.com/Yashvardhan-4/cohort-pccoe/stargazers"><img src="https://img.shields.io/github/stars/Yashvardhan-4/cohort-pccoe?style=for-the-badge&color=2563EB" alt="Stars" /></a>
    <a href="https://github.com/Yashvardhan-4/cohort-pccoe/network/members"><img src="https://img.shields.io/github/forks/Yashvardhan-4/cohort-pccoe?style=for-the-badge&color=7C3AED" alt="Forks" /></a>
    <a href="https://github.com/Yashvardhan-4/cohort-pccoe/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge" alt="License" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" /></a>
    <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" /></a>
    <a href="https://ai.google.dev/"><img src="https://img.shields.io/badge/Google_Gemini-1.5_Flash-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" /></a>
  </p>

  <p align="center">
    <strong>Cohort PCCOE</strong> is a unified, hyper-personalized student network and campus intelligence platform engineered specifically for students, faculty, and student clubs at <strong>Pimpri Chinchwad College of Engineering (PCCOE, Nigdi, Pune)</strong>.
  </p>
</div>

---

## ✨ Key Highlights & Features

### 🤖 1. Buddy AI — Campus Companion (Powered by Google Gemini 1.5 Flash)
- **Deep Campus Intelligence**: Trained specifically on PCCOE departments (*COMP, IT, MECH, ENTC, CIVIL, AIDS*), autonomous syllabus, exam timetables, ERP notice deadlines, and library resources.
- **Smart Navigation & Club Advice**: Answers student queries on locating labs in B-Block, finding faculty cabins in A-Block, or joining technical teams like *Team Redline (SAE BAJA)* and *GDGC*.
- **Interactive Chat Widget**: Floating responsive modal with streaming markdown responses and smart suggestion chips.

---

### 🗺️ 2. 3D Isometric Campus Map (`c/map`)
- **Interactive Campus Navigation**: Visual 3D perspective of PCCOE Nigdi campus.
- **Detailed Landmark Pins**:
  - 🏢 **B-Block**: Computer & IT Labs, GDGC Center, Seminar Halls.
  - 🏛️ **A-Block**: Mechanical/Civil workshops, Dean Academics, Examination Cell.
  - 📚 **Central Library**: 50,000+ technical volumes & digital IEEE access.
  - 🏎️ **Team Redline Garage**: Formula Student & SAE BAJA manufacturing workshop.
  - ☕ **Food Hub**: Main Canteen & Back-Gate Nescafe.

---

### 👥 3. Communities & Student Chapters (`c/communities`)
- Dedicated community hubs for 8 authentic PCCOE clubs:
  - 🌐 **GDGC PCCOE** (Google Developer Groups on Campus)
  - 🛡️ **OWASP PCCOE Student Chapter**
  - 🏎️ **Team Redline Racing** (Formula Student & SAE BAJA)
  - 🎭 **Art Circle PCCOE** (Purushottam & Firodiya Karandak)
  - 🤝 **NSS & ISR** (National Service Scheme & Social Responsibility)
  - ⚡ **IEEE Student Branch & ACM Student Chapter**
- Custom cover banners, club member directories, and live event announcements.

---

### 🎮 4. c/arcade — In-App Mini Games
- ♟️ **Playable Chess vs. Buddy AI**: Full chess engine with legal move indicator dots, piece capture logic, and automated heuristic AI opponent.
- ⭕❌ **Tic-Tac-Toe Arena**: Unbeatable Minimax AI algorithm with dynamic scoreboard and neon win lines.
- 🧩 **Sudoku Master (9x9 Grid)**: Interactive puzzle board with number keypad, conflict highlighter, and automated hint generator.

---

### ⚡ 5. XD Reels & Entertainment (`c/xd`)
- Real-time meme scraper delivering continuous campus humor and engineering memes.
- Animated Meta infinity loop preloader and responsive vertical video reel player.

---

### 👤 6. Student Profile & Custom Department Stamp (`c/profile`)
- **Dynamic Animated Banner**: Department-themed animated gradient background.
- **Live Rotating Department Stamp Ring**: `COHORT SOCIAL • <DEPT> • COHORT SOCIAL •`.
- **Edit Profile Popup**: Update bio, branch, year, roll number, and social links in real time.

---

### 🔒 7. Secure Authentication (Supabase + Google OAuth SSO)
- Real-time authentication powered by **Supabase**.
- Single Sign-On (SSO) via **Google OAuth 2.0**.
- Protected route guards with session persistence and 1-click logout.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 6, Tailwind CSS, Lucide React, Framer Motion |
| **Backend & DB** | Supabase (PostgreSQL, Realtime WebSockets, OAuth Auth) |
| **Artificial Intelligence**| Google Gemini 1.5 Flash API |
| **State & Data** | TanStack React Query, React Router v6, Local Storage Layer |
| **Hosting** | Vercel (Edge Network with SPA Rewrites) |

---

## 🚀 Quick Start & Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/Yashvardhan-4/cohort-pccoe.git
cd cohort-pccoe
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_SUPABASE_URL=https://cxbqgfzgcyltpkjboyrf.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_GOOGLE_CLIENT_ID=234786239650-vldp8ikbdq85srkbphojoc65ba49g430.apps.googleusercontent.com
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## 📁 Project Directory Structure

```plaintext
cohort-pccoe/
├── public/                 # Static assets, SVG doodles & club logos
├── src/
│   ├── components/         # Reusable UI (Buddy AI modal, vectors, navbar, preloader)
│   ├── context/            # AuthContext (Supabase) & ThemeContext (Dark/Light)
│   ├── layouts/            # DashboardLayout (Expandable sidebar & shell)
│   ├── lib/                # Gemini client, Supabase client & initial data store
│   ├── pages/              # Landing, Login, Communities, Network, Map, Arcade, etc.
│   ├── App.jsx             # Route definitions & GoogleOAuthProvider
│   ├── main.jsx            # React root mount
│   └── index.css           # Global typography & Tailwind utilities
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules (protects keys & dependencies)
├── tailwind.config.js      # Custom theme color tokens & fonts
├── vercel.json             # Vercel SPA routing configuration
└── vite.config.js          # Vite build config
```

---

## 👨‍💻 Author & Maintainer

- **Yashvardhan Borude** - [@Yashvardhan-4](https://github.com/Yashvardhan-4)
- Developed for the students and campus community of **PCCOE Pune**.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
