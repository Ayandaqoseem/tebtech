const asyncHandler = require("express-async-handler");
const Newsletter = require("../model/newsletterModel");
const { validateEmail } = require("../utils/authUtils");
const cron = require("node-cron");
const Product = require("../model/productModel");
const Coupon = require("../model/couponModel");
const Blog = require("../model/blogModel");
const generateNewsletterEmailTemplate = require("../utils/generateNewsletterTemplate");
const sendNewsletterEmail = require("../utils/utils/sendNewsletterMail");
const moment = require("moment-timezone");

// Create newsletter subscription
const newsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  if (!validateEmail(email)) {
    res.status(400);
    throw new Error("Kindly provide a valid email");
  }

  const existingSubscriber = await Newsletter.findOne({ email });

  if (existingSubscriber) {
    res.status(400);
    throw new Error("Email already subscribed");
  }

  const createNewsletter = new Newsletter({ email });

  await createNewsletter.save();

  res.status(200).json({ message: "Subscribed Successfully" });
});

// Delete newsletter subscription
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

  res.status(200).json("Unsubscribed Successfully");
});

// Cron job to send newsletters dynamically when new content is available
cron.schedule("* * * * 6", async () => {  
  console.log("Cron job triggered at:", new Date().toISOString());
    try {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7); 
  
        // Find new products, coupons, and blogs
        const newProducts = await Product.find({ newItem: true, createdAt: { $gt: lastWeek } });
        const newCoupons = await Coupon.find({ expiresAt: { $gt: new Date() }, createdAt: { $gt: lastWeek } });
        const newBlogPosts = await Blog.find({ createdAt: { $gt: lastWeek } }).sort({ createdAt: -1 });
  
        // Check if there's any new content to send
        if (newProducts.length === 0 && newCoupons.length === 0 && newBlogPosts.length === 0) {
            console.log("No new updates for this week, skipping newsletter.");
            return;  
        }
    
        const subscribers = await Newsletter.find();
  
        for (const subscriber of subscribers) {
            try {
                if (!subscriber.email || !validateEmail(subscriber.email)) {
                    console.error(`Invalid or missing email for subscriber:`, subscriber);
                    continue;
                }
  
                // Generate unsubscribe link dynamically for each subscriber
                const unsubscribeLink = `${process.env.FRONTEND_URL}/unsubscribe?email=${subscriber.email}`;
                console.log("UNSUBSCRIBE LINK =>", unsubscribeLink);
              
                // Generate the email template with dynamic content
                const emailBody = generateNewsletterEmailTemplate(
                    newProducts,
                    newCoupons[0],
                    newBlogPosts,
                    unsubscribeLink
                );
  
                // Send the newsletter email to the subscriber
                const subject = "Tebtechnologyltd - Latest Updates and Offers";
                const send_to = subscriber.email;
                const reply_to = "no-reply";
  
                // Send the email
                await sendNewsletterEmail(send_to, subject, reply_to, emailBody);
              
                // Log the success
                console.log(`Newsletter sent to ${subscriber.email}`);
  
                // Update the last sent timestamp for the subscriber
                subscriber.lastSentAt = new Date();
                const subscribernewsletter = await subscriber.save();

                console.log("subscribernewsletter =>", subscribernewsletter);
             
            } catch (err) {
                console.error(`Failed to send email to ${subscriber.email}:`, err);
            }
        }
    } catch (error) {
        console.error("Error sending newsletter:", error);
    }
}, {
    timezone: "UTC"  
});


module.exports = {
  newsletter,
  unsubscribe,
};
 