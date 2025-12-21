HR Asset Verse – Frontend
A modern HR Asset Management System Frontend built with React, Firebase Authentication, and JWT‑based secure API communication.
This application allows HR/Admins and Employees to manage company assets, requests, assignments, and subscriptions efficiently.

🌐 Live Application
Live URL:
👉 https://hr-asset-verse.web.app

📦 Repository
GitHub Repository:
👉 https://github.com/AMINBD2022/HR-Asset-Verse-Client.git

🚀 Features
🔐 Firebase Authentication (Login / Register)

🪪 JWT Token based API security

📋 Asset Management (Add, Update, Delete)

📨 Asset Request & Approval System

👥 Employee Affiliation Management

📦 Subscription & Package Handling

💳 Stripe Payment Integration

🔍 Filtering, Pagination

⚡ Axios Secure Instance for API calls

🛠️ Tech Stack
React
React Router
Firebase Authentication
Axios
JWT
Tailwind CSS
Stripe (Frontend Integration)

🔑 Authentication Flow
User logs in using Firebase Authentication

Firebase provides authenticated user

Frontend requests JWT from backend using user email

JWT is stored in localStorage

Axios Secure sends JWT in Authorization header

Protected APIs validate JWT on backend

📁 Project Structure
src/
├── components/
├── pages/
├── hooks/
├── providers
├── routes/
└── firebase/
⚙️ Environment Variables

▶️ Run Locally
npm install
npm run dev
👨‍💻 Author
MD Aminul Islam
Frontend Developer
