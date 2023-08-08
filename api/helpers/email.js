var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  requireTLS: true,
  auth: {
    user: "shrutisachpara.shivinfotech@gmail.com",
    pass: "mlnouydlcywezkhn",
  },
});

const sendEmail = (email, otp) => {
  var mailOptions = {
    from: "shrutisachpara.shivinfotech@gmail.com",
    to: "rennyjhala00@gmail.com",
    subject: "Sending Email using Node.js",
    text: `It's OTP: ${otp}`,
  };

  let response = transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      return info.response;
    }
  });
  return response;
};

module.exports = {
  sendEmail,
};
