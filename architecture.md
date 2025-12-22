 
# 🧠 Architecture Explanation


## 1️⃣ Frontend – Angular (SPA)

Built using latest Angular (standalone components)

Organized using feature-based architecture

Key layers:

Features: auth, flights, bookings, profile, my-bookings

Core: interceptors (JWT auth)

Shared: reusable components, services, validators, pipes

Uses:

Angular Services for API communication

Auth Interceptor to attach JWT token

Route Guards for protected pages (Profile, Bookings)

```bash
features/
 ├── auth
 ├── flights
 ├── bookings
 ├── profile
shared/
 ├── components
 ├── services
 ├── validators
```



## 2️⃣ Backend – Node.js + Express + TypeScript

RESTful API built with Express

Follows modular architecture

Each module contains:

controller → handles HTTP requests

service → business logic

model → MongoDB schema

routes → API routing

validation → request validation

```bash
modules/
 ├── auth
 ├── users
 ├── flights
 ├── booking
```

Middlewares

JWT Authentication

Request validation (Zod / custom)

Uses dotenv for environment configuration


## 3️⃣ Database – MongoDB

MongoDB used as primary database

Accessed via Mongoose

Collections:

users

flights

bookings

Includes seed scripts to preload flight data

```bash
seed/
 └── seed-flights.ts
 ```

## 4️⃣ Request Flow (End-to-End)

User interacts with Angular UI

Angular Service sends API request

Auth Interceptor attaches JWT token

Express route receives request

Middleware validates & authenticates

Controller → Service → Database

Response sent back as JSON

UI updates accordingly