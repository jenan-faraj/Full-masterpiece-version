import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./Pages/Profile";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Categories from "./Pages/categories";
import SalonRegistrationForm from "./Pages/SalonRegistrationForm";
import SalonDetails from "./Pages/salonDetails";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/salonDetails/:id" element={<SalonDetails />} />
        <Route
          path="/salonRegistrationForm"
          element={<SalonRegistrationForm />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
