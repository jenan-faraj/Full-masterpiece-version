const mongoose = require("mongoose");

const salonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    salonOwnershipImagePreview: { type: String, required: true },
    identityImagePreview: { type: String, required: true },
    subscription: { type: String, default: "non" },
    role: { type: String, default: "salon_owner" },
    isDeleted: { type: Boolean, default: false },
    profileImage: { type: String, default: "" },
    longDescription: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    services: {
      type: [
        { title: { type: String, default: "" } },
        { images: [{ type: String, default: "" }], default: [] },
        { Category: { type: String, default: "" } },
        { Duration: { type: String, default: "" } },
        { shortDescription: { type: String, default: "" } },
        { longDescription: { type: String, default: "" } },
        { price: { type: Number, default: 0 } },
      ],
      default: [],
    },
    visitors: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    book: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
    openingHours: {
      open: { type: String, default: "" },
      close: { type: String, default: "" },
    },
    openingYear: { type: String, default: "" },
    map: {
      lng: { type: Number, default: 0 },
      lat: { type: Number, default: 0 },
    },
    servicesImages: { type: [String], default: [] },
    offers: {
      type: [
        { title: { type: String, default: "" } },
        { images: [{ type: String, default: "" }], default: [] },
        { description: { type: String, default: "" } },
        { endDate: { type: Date, default: "" } },
        { originalPrice: { type: Number, default: 0 } },
        { discountPrice: { type: Number, default: 0 } },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Salon", salonSchema);
