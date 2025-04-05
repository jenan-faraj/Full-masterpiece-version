const express = require("express");
const router = express.Router();
const salonController = require("../controller/SalonController");


router.post("/", salonController.createSalon);
router.get("/", salonController.getSalons);
router.get("/:id", salonController.getSalonById);
router.put("/:id", salonController.updateSalon);
router.delete("/:id", salonController.deleteSalon);

module.exports = router;