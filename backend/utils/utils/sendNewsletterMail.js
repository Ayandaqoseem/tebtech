const nodemailer = require("nodemailer");

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Function to send the newsletter email
const sendNewsletterEmail = async (send_to, subject, reply_to, template) => {
  try {
   
    // Define the email options
    const mailOptions = {
      from: `Tebtechnologyltd <${process.env.EMAIL_USER}>`, 
      to: send_to, 
      replyTo: reply_to,
      subject, 
      html: template, 
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Newsletter sent to: ${send_to}`);
  } catch (error) {
    console.error(`Failed to send email to ${send_to}:`, error);
  }
};

module.exports = sendNewsletterEmail;
