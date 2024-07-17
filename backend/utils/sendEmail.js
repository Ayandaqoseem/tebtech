const nodemailer = require("nodemailer");
const MailGen = require("mailgen");

const sendEmail = async (subject, send_to, template, send_from, cc=null) => {
  // Create Email Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Create Template With MailGen
  const mailGenerator = new MailGen({
    theme: "salted",
    product: {
      name: "tebtechnologyltd",
      link: "http://localhost:3000",
    },
  });

  const emailTemplate = mailGenerator.generate(template);
  require("fs").writeFileSync("preview.html", emailTemplate, "utf8");

  // Options for sending email
  const options = {
    from: send_from,
    to: send_to,
    subject,
    html: emailTemplate,
    cc,
  };

  // Send Email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      // console.log("INFO =>", info);
    }
  });
};

module.exports = sendEmail;
