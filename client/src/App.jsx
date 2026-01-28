import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContent } from "./context/AppContext";
import axios from "axios";

const App = () => {
  const { getUserData, isLoggedin, setIsLoggedIn, userData } =
    useContext(AppContent);

  // // --- FIX 1: Send cookies with EVERY request ---
  // axios.defaults.withCredentials = true;

  // // --- FIX 2: Check if user is logged in on Page Load ---
  // useEffect(() => {
  //   // Attempt to fetch user data immediately
  //   getUserData();
  // }, []); // Empty dependency array = runs once on mount

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
