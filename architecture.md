 
# 🧠 Architecture Explanation

## 1️⃣ Frontend – Angular (SPA)

Built using the latest **Angular** (standalone components) and organized using **feature-based architecture**.

### Key Layers

- **Features**: `auth`, `flights`, `bookings`, `profile`, `my-bookings`  
- **Core**: interceptors (JWT auth)  
- **Shared**: reusable components, services, validators, pipes  

### Uses

- Angular Services for API communication  
- Auth Interceptor to attach JWT token  
- Route Guards for protected pages (Profile, Bookings)

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




---

## 2️⃣ Backend – Node.js + Express + TypeScript

RESTful API built with **Express**, following a **modular architecture**.

Each module contains:

- **controller** → handles HTTP requests  
- **service** → business logic  
- **model** → MongoDB schema  
- **routes** → API routing  
- **validation** → request validation

```bash
modules/
 ├── auth
 ├── users
 ├── flights
 ├── booking
```


### Middlewares

- JWT Authentication  
- Request validation (Zod / custom)  
- Uses `dotenv` for environment configuration  

---

## 3️⃣ Database – MongoDB

**MongoDB** is used as the primary database, accessed via **Mongoose**.

### Collections

- `users`  
- `flights`  
- `bookings`  

Includes seed scripts to preload flight data:


```bash
seed/
 └── seed-flights.ts
 ```


---

## 4️⃣ Request Flow (End-to-End)

1. User interacts with Angular UI.  
2. Angular Service sends API request.  
3. Auth Interceptor attaches JWT token.  
4. Express route receives the request.  
5. Middleware validates & authenticates.  
6. Controller → Service → Database.  
7. Response sent back as JSON.  
8. UI updates accordingly.
