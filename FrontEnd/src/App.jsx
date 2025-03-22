import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Categories from "./Pages/categories";
import SalonRegistrationForm from "./Pages/SalonRegistrationForm";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/salonRegistrationForm" element={<SalonRegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
