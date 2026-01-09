# Task Management App (MERN Stack)

A scalable, responsive web application for managing tasks with secure authentication. Built for the Frontend Developer Intern assignment at Primetrade.AI.

## 🚀 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Axios.
- **UI Libraries:** React Hot Toast (Notifications), SweetAlert2 (Modals).
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas (Cloud).
- **Authentication:** JWT (JSON Web Tokens) & BCrypt.

## ✨ Features

- **Authentication:** Secure Login & Registration with JWT and local storage persistence.
- **Protected Routes:** Dashboard is inaccessible without a valid token.
- **CRUD Operations:** Create, Read, Update, and Delete tasks.
- **Responsive Design:** Fully mobile-friendly UI using Tailwind CSS.
- **UX Enhancements:**
  - Toast notifications for success/error states.
  - SweetAlert2 confirmation popups for critical actions.
- **Scalability Plan:** Includes a detailed architectural strategy for scaling to 100k+ users (see `SCALABILITY.md`).

## 🛠️ Installation & Setup

### 1. Prerequisites

- Node.js (v14+ recommended)
- MongoDB Atlas Connection String

### 2. Backend Setup

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the server:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will run at http://localhost:5173.

## 📂 Project Structure

```text
root/
├── backend/          # Node.js API
│   ├── models/       # Database Schemas
│   ├── routes/       # API Endpoints
│   ├── middleware/   # Auth Middleware
│   └── server.js     # Entry point
├── frontend/         # React App
│   ├── src/
│   │   ├── context/  # Auth State
│   │   ├── pages/    # Login, Dashboard
│   │   └── components/
└── SCALABILITY.md    # Architecture Plan
```
