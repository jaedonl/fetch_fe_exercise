# 🐶 Dog Finder Project - Setup Guide

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or later)
- **npm** or **yarn**
- **Git**

---

# Getting Started

## ** Clone the Repository**

```sh
git clone https://github.com/your-repo/dog-finder.git
cd dog-finder
```

---

## ** Backend Setup (Node.js + Express)**

### ** Navigate to the backend folder**

```sh
cd backend
```

### ** Install Dependencies**

```sh
npm install
```

### ** Create an ****\`\`**** file**

Create a `.env` file in the `backend` folder and add:

```
PORT=5001
BASE_API_URL=[this is secret!]
```

### **▶️ Run the Backend Server**

```sh
npm run dev
```

By default, the server runs on \`\`.

---

## ** Frontend Setup (React + Vite + TypeScript)**

### ** Navigate to the frontend folder**

```sh
cd ../frontend
```

### ** Install Dependencies**

```sh
npm install
```

### ** Create an ****\`\`**** file**

Create a `.env` file in the `frontend` folder and add:

```
VITE_API_BASE_URL=http://localhost:5001
```

### **▶️ Run the Frontend**

```sh
npm run dev
```

By default, the frontend runs on \`\`.

---

# API Endpoints

| Method | Endpoint            | Description                    |
| ------ | ------------------- | ------------------------------ |
| POST   | `/auth/login`       | Login user                     |
| POST   | `/auth/logout`      | Logout user                    |
| GET    | `/dogs/breeds`      | Fetch dog breeds               |
| GET    | `/dogs/search`      | Search for dogs                |
| POST   | `/dogs/match`       | Get best match from favorites  |
| POST   | `/locations/search` | Search locations by city/state |

---

# How to Use the Project

1️⃣ **Start the backend** (`npm run dev` inside `backend` folder).\
2️⃣ **Start the frontend** (`npm run dev` inside `frontend` folder).\
3️⃣ **Go to** `http://localhost:5173` in your browser.\
4️⃣ **Login and start searching for dogs!**

---

# Troubleshooting

- **Port already in use?** Try changing the port in the `.env` file.
- **Backend not responding?** Ensure it's running and check logs (`npm run dev`).
- **Frontend can't connect to API?** Check the `VITE_API_BASE_URL` in `.env`.

