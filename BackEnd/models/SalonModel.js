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
    services: { type: [String], default: [] }, // ✅ تعديل المصفوفة
    visitors: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    openingHours: {
      monday: {
        open: { type: String, default: "" },
        close: { type: String, default: "" },
      },
      tuesday: {
        open: { type: String, default: "" },
        close: { type: String, default: "" },
      },
      wednesday: {
        open: { type: String, default: "" },
        close: { type: String, default: "" },
      },
      thursday: {
        open: { type: String, default: "" },
        close: { type: String, default: "" },
      },
      friday: {
        open: { type: String, default: "" },
        close: { type: String, default: "" },
      },
      saturday: {
        open: { type: String, default: "" },
        close: { type: String, default: "" },
      },
      sunday: {
        open: { type: String, default: "" },
        close: { type: String, default: "" },
      },
    },
    map: {
      lng: { type: Number, default: 0 },
      lat: { type: Number, default: 0 },
    },
    servicesImages: { type: [String], default: [] }, // ✅ تعديل المصفوفة
    offers: { type: [String], default: [] }, // ✅ تعديل المصفوفة
  },
  { timestamps: true }
);

module.exports = mongoose.model("Salon", salonSchema);

