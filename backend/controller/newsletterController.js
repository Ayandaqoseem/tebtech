const asyncHandler = require("express-async-handler");
const Newsletter = require("../model/newsletterModel");
const { validateEmail } = require("../utils/authUtils");

// Create newsletter
const newsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  if(!validateEmail(email)) {
    res.status(400);
    throw new Error("Kindly provide valid email");
  }

  const existingSubscriber = await Newsletter.findOne({ email });

  if (existingSubscriber) {
    res.status(400);
    throw new Error("Email is already subscribed");
  }

  const createNewsletter = new Newsletter({ email });

  await createNewsletter.save();

  res.status(200).json({ message: "Subscribed Successfully" });
});

// Delete newsletter
const unsubscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const result = await Newsletter.findOneAndDelete({ email });

  if (!result) {
    res.status(400);
    throw new Error("Email not found in subscription");
  }

  res.status(200).json({ message: "Unsubscribed Successfully" });
});

module.exports = {
  newsletter,
  unsubscribe,
};
 