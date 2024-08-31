const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  transferFund,
  verifyAccount,
  getUserTransactions,
  // depositFundStripe,
  // webhook,
  depositFundFLW,
} = require("../controller/transactionController");

router.post("/transferFund", protect, transferFund);
router.post("/verifyAccount", protect, verifyAccount);
router.post(
  "/getUserTransactions",
  express.json(),
  protect,
  getUserTransactions
);
// router.post("/depositFundStripe", express.json(), protect, depositFundStripe);
// router.post("/webhook", express.raw({ type: "application/json" }), webhook);

router.get("/depositFundFLW", depositFundFLW);

module.exports = router;
