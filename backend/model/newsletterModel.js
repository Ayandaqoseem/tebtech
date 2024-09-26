const mongoose = require("mongoose");

const NewsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    lastSentAt: {
      type: Date,
      default: null,
    },
  },
  {
    timetstamps: true,
  }
);

const Newsletter = mongoose.model("Newsletter", NewsletterSchema);
module.exports = Newsletter;
