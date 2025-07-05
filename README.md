# 🌾 HarvestConnect

**HarvestConnect** is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to connect farmers, buyers, and distributors through a secure, efficient, and scalable platform. It features JWT authentication and a modular frontend state management system using stores.

🚀 **Live Demo:** [https://miniproject-i84g.onrender.com/](https://miniproject-i84g.onrender.com/)

---

## 🔑 Features

- 🔐 JWT-based Authentication (Login/Signup)
- 👥 User roles and access control
- 🌾 Crop/Product Listing CRUD operations
- 🛒 Buyer interface for browsing and contacting sellers
- 📦 State management via frontend stores
- ⚡ RESTful API with Express and MongoDB
- 🔧 Modular code structure for scalability

---

## 🧱 Project Structure

```

/backend
├── config/             # DB & JWT config
├── controllers/        # Business logic
├── middleware/         # Auth and error handling
├── models/             # Mongoose schemas
├── routes/             # Express endpoints
└── server.js           # Entry point

/frontend
├── public/             # Static assets
├── src/
│   ├── api/            # Axios calls
│   ├── components/     # Reusable UI
│   ├── pages/          # Views and route pages
│   ├── stores/         # Context/Redux stores
│   ├── App.js          # Main layout and router
│   └── index.js        # Root renderer

````

---

## ⚙️ Installation

### 🔧 Backend Setup

```bash
cd backend
npm install
````

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/harvestconnect
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

Start the server:

```bash
npm run dev
```

### 💻 Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` in `/frontend`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Run the React app:

```bash
npm start
```

---

## 🔐 Authentication Flow

* User registers or logs in
* JWT token is issued and saved locally
* Protected routes require token to access
* AuthStore or Context manages login/logout flow

---

## 🏬 State Management

Frontend state is managed via:

* **AuthStore** – Login, logout, token, user data
* **ListingStore** – CRUD operations for crop listings
* **UserStore** – User profile and settings

---

## 🛠️ API Endpoints

| Method | Route                | Description                     |
| ------ | -------------------- | ------------------------------- |
| POST   | `/api/auth/register` | Register new user               |
| POST   | `/api/auth/login`    | Login user, get JWT             |
| GET    | `/api/auth/me`       | Get current user (JWT required) |
| GET    | `/api/listings`      | Get all crop listings           |
| POST   | `/api/listings`      | Add new crop (JWT required)     |
| PUT    | `/api/listings/:id`  | Update listing (JWT required)   |
| DELETE | `/api/listings/:id`  | Delete listing (JWT required)   |

---

## 🧪 Testing (Optional)

If using Jest or similar:

```bash
cd backend
npm test

cd frontend
npm test
```

---

## 🌍 Deployment

The application is live at:

👉 **[https://miniproject-i84g.onrender.com/](https://miniproject-i84g.onrender.com/)**

Deployment used:

* **Render** for backend & frontend (monorepo or separate builds)
* **MongoDB Atlas** (optional)

### Steps:

1. Build frontend:

   ```bash
   npm run build
   ```
2. Serve via backend:

   * Set `Express.static()` to `/frontend/build`
3. Add proper `.env` values in the Render dashboard

---

## 📋 Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=<MongoDB connection URI>
JWT_SECRET=<Your JWT secret>
JWT_EXPIRES_IN=7d
```

### Frontend `.env`

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🔮 Roadmap

* [ ] User profile editing
* [ ] Admin dashboard for managing users/listings
* [ ] PWA support for mobile access
* [ ] Real-time notifications (Socket.io)
* [ ] Chat system between buyer & farmer

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋 Contact

**Ishan Gijavanekar**, **Gururaj Kurbet**
GitHub: [@Ishan-Gijavanekar](https://github.com/Ishan-Gijavanekar)

---

### 🌱 Grow smarter with HarvestConnect!

