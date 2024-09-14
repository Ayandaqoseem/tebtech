const express = require("express");
const { newsletter, unsubscribe } = require("../controller/newsletterController");

const router = express.Router();

router.post("/", newsletter);
router.post("/unsubscribe", unsubscribe);

module.exports = router
