const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    services: [
      {
        type: String,
        required: true,
      },
    ],
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    OTP: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
