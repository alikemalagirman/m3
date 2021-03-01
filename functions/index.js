const functions = require("firebase-functions");
const config = functions.config();
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.user.email,
    pass: config.user.password,
  },
});

const mailOptions = {
  from: "Arc Development",
  to: "alikemalagirman@gmail.com",
  subject: "Testing nodemailer",
  text: "Test succesful",
};

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.sendMail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        response.send(error);
      } else {
        response.send("Message sent succesfully");
      }
    });
  });
});
