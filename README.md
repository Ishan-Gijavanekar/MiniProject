# 🌾 HarvestConnect

**HarvestConnect** is a full‑stack MERN (MongoDB, Express, React, Node.js) application that connects farmers, buyers, and distributors through a secure and scalable platform. It incorporates JWT authentication and a well‑structured frontend using state stores (e.g., Redux or Context API) to manage application state cleanly and efficiently.

---

## 🔑 Features

- **JWT‑based authentication** for secure login, signup, and route protection  
- **User roles & permissions** (e.g. farmer, buyer, admin)  
- **Frontend stores** for managing authentication status, user data, and application state  
- **CRUD operations** for listings: create, read, update, delete  
- **RESTful APIs** with JWT middleware for protected routes  
- **MongoDB** for scalable JSON‑document data storage  

---

## 🧱 Project Structure

```

/backend
├── config/             # Config files (e.g., database, JWT secret)
├── controllers/        # Route logic (auth, users, listings)
├── middleware/         # JWT authentication, error handling
├── models/             # Mongoose schemas
├── routes/             # Express route definitions
└── server.js           # Entry point for the backend

/frontend
├── public/             # Static assets & index.html
├── src/
│   ├── api/            # Axios or fetch API calls
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route/home/dashboard pages
│   ├── stores/         # Context or Redux stores (auth, listings, etc.)
│   ├── App.js          # App layout and route setup
│   └── index.js        # React DOM renderer
└── package.json

.gitignore
README.md

````

---

## 🚀 Prerequisites

- Node.js ≥ 14.x  
- MongoDB (local or cloud-based)  
- (Optional) Yarn  

---

## ⚙️ Setup & Installation

### 1. Backend

```bash
cd backend
npm install
````

Create a `.env` file (copy `.env.example` if provided) including:

```
PORT=5000
MONGO_URI=your_mongo_url
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

Start the backend server:

```bash
npm run dev
# or
npm start
```

Server runs on **[http://localhost:5000](http://localhost:5000)**

### 2. Frontend

```bash
cd frontend
npm install
```

Create `.env` file in `frontend/`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend app:

```bash
npm start
```

App runs on **[http://localhost:3000](http://localhost:3000)**

---

## 🔐 Authentication Flow

1. `AuthStore` (Redux or Context) handles login, logout, and registration flows.
2. On login/signup, user obtains an access token (JWT) from the server.
3. JWT is saved in localStorage or HTTP-only cookie and used for all API calls.
4. `PrivateRoute` or protected route components block access to authenticated pages.
5. `AuthStore` fetches and stores user info (e.g., name, email, role).

---

## 🏬 State Management (Stores)

The frontend is organized with the following stores:

* **AuthStore**: Manages user authentication and JWT storage
* **UserStore**: Retrieves and updates user profile info
* **ListingStore**: CRUD operations for agricultural product listings

Each store handles asynchronous actions (e.g., `login()`, `fetchListings()`, etc.) and exposes state and methods to React components via Context or Redux.

---

## 📦 API Endpoints

| Method | Endpoint             | Description                                 |
| ------ | -------------------- | ------------------------------------------- |
| POST   | `/api/auth/register` | Register a new user                         |
| POST   | `/api/auth/login`    | Authenticate user and return JWT            |
| GET    | `/api/auth/me`       | Fetch current user's profile (requires JWT) |
| GET    | `/api/listings`      | Retrieve all listings (public)              |
| GET    | `/api/listings/:id`  | Get listing by ID                           |
| POST   | `/api/listings`      | Create a new listing (JWT required)         |
| PUT    | `/api/listings/:id`  | Update a listing (JWT & owner required)     |
| DELETE | `/api/listings/:id`  | Delete a listing (JWT & owner required)     |

*Adjust or extend according to your implementation.*

---

## 🧪 Running in Development

Open two terminal windows/tabs:

* **Backend**:

  ```bash
  cd backend
  npm run dev
  ```

* **Frontend**:

  ```bash
  cd frontend
  npm start
  ```

This setup uses auto-reloading (e.g., Nodemon, React’s Fast Refresh) for rapid development.

---

## ✅ Testing

If you have tests set up (e.g., Jest, Supertest), add here:

```bash
cd backend
npm test

cd frontend
npm test
```

---

## 🌐 Deployment

Steps for deploying your MERN stack:

1. Build the frontend:

   ```bash
   cd frontend
   npm run build
   ```
2. Serve static files from the backend (e.g., via Express), or host frontend separately using Netlify/Vercel and backend via Heroku/AWS.
3. Set environment variables accordingly (`NODE_ENV=production`, `MONGO_URI`, `JWT_SECRET`).
4. Secure your endpoints (CORS, HTTPS, helmet, rate limiting).

---

## 🔧 Useful Scripts

* `npm run dev` – Start backend with hot-reload
* `npm start` – Run backend (production style)
* `npm run client` – Launch React development server
* `npm run build` – Bundle frontend for production

---

## 📋 Environment Variables

**Backend (.env)**

```
PORT=5000
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=<your JWT secret>
JWT_EXPIRES_IN=7d
```

**Frontend (.env)**

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🎯 Roadmap

* [ ] User profile editing & avatar upload
* [ ] Notifications between users
* [ ] Search & filter listings by crop, location, price
* [ ] Admin dashboard for user/listing management
* [ ] Mobile responsiveness & PWA support

---

## 🙌 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the *MIT License* – see the [LICENSE](LICENSE) file for details.

---

## 💬 Contact

Created by **Ishan Gijavanekar**, **Gururaj Kurbet**.
Feel free to open issues or contact via GitHub.

---

**Enjoy building HarvestConnect!**

```
