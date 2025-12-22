# ✈️ Flight Booking System

A modern **full-stack Flight Booking System** built with **Angular 20** (frontend) and **Node.js + Express + MongoDB** (backend).  
This project demonstrates **real-world architecture**, clean state management with **NgRx**, and production-ready best practices.

---

## 🧰 Tech Stack

```bash
• Architecture: Monorepo
  ├─ flight-booking-system/
  │  ├─ frontend/ (Angular)
  │  ├─ backend/  (Node API)
  │  └─ root package.json (orchestration only)
```

### Frontend
- Angular **20** (Standalone Components)
- Angular Material
- RxJS & NgRx
- TypeScript

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB (Local or Atlas)
- Mongoose
- JWT Authentication
- Zod Validation

---

## 📋 Prerequisites

Make sure the following are installed on your system:

```bash
node -v
# v22.19.0

npm -v
# 10.9.3

# Install Angular CLI (required for frontend):
npm install -g @angular/cli@20

# Verify installation:
ng version
 
# 1️⃣ Clone the Repository
git clone https://github.com/Sayyed8999/flight-booking-system.git
cd flight-booking-system

# 🖥️ Frontend Setup (Angular) 
cd frontend
npm install
ng serve

# Frontend will be available at:
http://localhost:4200

# 🗄️ Backend Setup (Node.js + Express)
cd backend
npm install

# Create a .env file inside:
# flight-booking-system/backend/.env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/flight-booking
JWT_SECRET=your_secret_key

# Run Backend Server from flight-booking-system/backend
npm run dev

# Backend API will be available at:
http://localhost:4000

# Project Structure 
flight-booking-system/
│
├── frontend/        # Angular 20 application
│
├── backend/         # Node.js + Express API
│   ├── src/
│   ├── .env
│   └── package.json
│
└── README.md
```




✅ Notes

Node.js v22.x is recommended

Restart backend after changing .env values

Never commit .env files to version control

MongoDB can be local or hosted (Atlas)


---

## ✨ Features

### 🔐 Authentication
- User registration with OTP verification
- Login with JWT authentication
- Secure logout
- Auth-protected routes (Profile, Bookings)

### 👤 Profile Management
- View logged-in user profile
- Update user name
- Email & role are read-only
- Profile data synced with global auth state (NgRx)

### ✈️ Flight Search
- One-way & round-trip flight search
- Departure & return date validation
- Prevents past-date selection
- Responsive search UI

### 🧾 Booking Flow
- Flight selection
- Passenger information capture
- Seat preference selection
- Booking confirmation flow
- Reload-safe booking state using NgRx

### 📘 My Bookings
- View all bookings for logged-in user
- Auth-protected page
- Clean empty & loading states

### 🧠 Architecture Highlights
- Standalone Angular components (no NgModules)
- Feature-based NgRx store (Auth, Booking)
- Effects for API calls & side effects
- Reusable form components (ControlValueAccessor)
- Backend modular structure
- Strict typing & validation

---

## 🧪 API Testing (Postman Collection)

All backend APIs are documented and testable using a **Postman Collection**.

🔗 **Postman Workspace & Collection**  
https://sayyedhussain9044-1860980.postman.co/workspace/Sayyed-Farhan-Hussain's-Workspa~ad81011b-189c-4cdb-8030-6599762dcf09/folder/49193781-15ab3931-c9c7-433c-ab4f-5558f7a785b8

### 📌 Includes
- Authentication APIs (Register, OTP Verification, Login)
- Profile APIs (Get Profile, Update Profile)
- Booking APIs (Create Booking, My Bookings)
- Auth-protected requests using JWT Bearer Token

### 🛠 How to Use
1. Open the Postman link above
2. Set environment variable:
   - `BASE_URL` → `http://localhost:4000`
3. Login using Auth APIs
4. Copy JWT token and set it as:
   - `Authorization: Bearer <token>`
5. Test protected APIs (Profile, Bookings)

> 💡 The Postman collection reflects the latest backend implementation and is useful for local testing and debugging.

---


