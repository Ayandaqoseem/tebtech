const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { createBrand, deleteBrand, getBrands } = require("../controller/brandController");
const router = express.Router();

router.post("/createBrand", protect, adminOnly, createBrand);
router.get("/getBrands", protect, adminOnly, getBrands);

router.delete("/:slug", protect, adminOnly, deleteBrand);

module.exports = router;
