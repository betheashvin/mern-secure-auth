A production-level Authentication System built with the **MERN Stack** (MongoDB, Express, React, Node.js). 

🔗 **Live Demo:** Vercel Link

## ✨ Key Features

* **🔐 Secure Authentication:** User Registration & Login using JWT.
* **🍪 HttpOnly Cookies:** Tokens are stored in HttpOnly cookies to prevent XSS attacks.
* **📧 Email Verification:** 6-digit OTP verification using Nodemailer.
* **🔑 Password Management:** Secure Password Reset flow via email.
* **🛡️ Protected Routes:** Frontend route guards to restrict access.
* **✨ Modern UI:** Responsive design built with Tailwind CSS.

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, Tailwind CSS, Axios, Context API.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (Mongoose).
* **Security:** JSON Web Tokens (JWT), BCrypt.js, Cookie-Parser, CORS.

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/betheashvin/mern-secure-auth.git
cd mern-secure-auth

```

### 2. Install Dependencies

You need to install dependencies for both the client and server.

**Backend:**

```bash
cd server
npm install

```

**Frontend:**

```bash
cd ../client
npm install

```

### 3. Environment Variables

Create a `.env` file in the **server** folder:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password
SENDER_EMAIL=your_email@gmail.com

```

Create a `.env` file in the **client** folder:

```env
VITE_BACKEND_URL=http://localhost:4000

```

### 4. Run the App

**Start Backend:**

```bash
cd server
npm run server

```

**Start Frontend:**

```bash
cd client
npm run dev

```
