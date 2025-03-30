const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/UserRoute");
const salonRoutes = require("./routes/SalonRoute");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/ReviewRoutes");

//---------------------------
// Middleware
//---------------------------
dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
const corsOptions = { origin: "http://localhost:5173", credentials: true };
app.use(cors(corsOptions));
console.log("JWT_SECRET:", process.env.JWT_SECRET);

//---------------------------
// Connect DB
//---------------------------
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

//---------------------------
// ROUTES
//---------------------------
app.use("/api/users", userRoute);
app.use("/api/salons", salonRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookRoutes); // تحديد المسار الأساسي للـ routes
app.get("/get_token", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ message: "No token found" });
  }
  res.send({ token });
});

//---------------------------
// ERROR HANDLERS
//---------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong! " + err);
});

//---------------------------
// Connect SERVER
//---------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
