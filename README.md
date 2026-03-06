# 🚀 Streamware

A **full-stack real-time chat and video communication platform** built using the **MERN stack** and **Stream APIs**.
Streamware allows users to connect with friends, exchange messages instantly, and start video calls in a modern and responsive interface.

---

# 📌 Features

### 🔐 Authentication

* Secure user authentication
* Signup & login system
* Protected routes using JWT
* Session validation

### 👤 User System

* User profiles
* Friend request system
* Accept / reject requests
* Notification system

### 💬 Real-Time Chat

* One-to-one chat
* Instant message delivery
* Message history
* Typing indicators

### 📞 Video Calling

* Start video calls directly from chat
* Real-time WebRTC communication
* Integrated Stream Video SDK

### 🌙 UI & Experience

* Responsive UI
* Multiple themes
* Modern design with TailwindCSS
* Smooth loading states

---

# 🏗️ Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* Zustand (state management)

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## Real-Time Services

* Stream Chat API
* Stream Video SDK

---

# 📂 Project Structure

```
Streamware
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   │   ├── auth.controller.js
│   │   │   ├── chat.controller.js
│   │   │   └── user.controller.js
│   │   │
│   │   ├── models
│   │   │   ├── User.js
│   │   │   └── FriendRequest.js
│   │   │
│   │   ├── routes
│   │   │   ├── auth.route.js
│   │   │   ├── chat.route.js
│   │   │   └── user.route.js
│   │   │
│   │   ├── middleware
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── lib
│   │   │   ├── db.js
│   │   │   └── stream.js
│   │   │
│   │   └── server.js
│   │
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── lib
│   │   ├── store
│   │   └── constants
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/karthik143-py/Streamware.git
```

Go to project folder

```bash
cd Streamware
```

---

# 🔧 Backend Setup

```
cd backend
npm install
```

Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
STREAM_API_KEY=your_key
STREAM_API_SECRET=your_secret
```

Run server

```
npm run dev
```

---

# 🎨 Frontend Setup

```
cd frontend
npm install
```

Run development server

```
npm run dev
```

Frontend will run at

```
http://localhost:5173
```

---

# 🔗 API Endpoints

## Authentication

```
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me
```

## Users

```
GET /api/users
GET /api/users/friends
```

## Friend Requests

```
POST /api/users/send-request
POST /api/users/accept-request
```

## Chat

```
GET /api/chat/messages
POST /api/chat/send
```

---

# 🔐 Environment Variables

Backend `.env`

```
PORT=
MONGO_URI=
JWT_SECRET=
STREAM_API_KEY=
STREAM_API_SECRET=
```

Frontend `.env`

```
VITE_API_URL=http://localhost:5000
VITE_STREAM_KEY=
```

---

# 🚀 Deployment

## Backend

* Render
* Railway
* AWS

## Frontend

* Vercel
* Netlify

---

# 🧪 Future Improvements

* Group chat
* File sharing
* Voice messages
* Online presence indicators
* Push notifications
* Mobile app

---

# 🤝 Contributing

Contributions are welcome.

Steps:

```
fork repo
create branch
make changes
create pull request
```

---

# 📜 License

MIT License

---

# 👨‍💻 Author

Karthik
GitHub:
https://github.com/karthik143-py
