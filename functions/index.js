const functions = require("firebase-functions");
const config =functions.config();

const admin = require("firebase-admin");
const nodemailer = require("nodemailer");



admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {user: config.user.email, pass: config.user.password}});

const mailOptions = {
  from: "Arc Development",
  to: "alikemalagirman@gmail.com",
  subject: "Testing nodemailer",
  text: "Test Succesful"};


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.sendMail = functions.https.onRequest((request, response) => {
      
      response.set('Access-Control-Allow-Origin', '*');
      transporter.sendMail(mailOptions, error => {
        if (error) {
          response.send(error);
        } else {
          response.send("message sent succesfully");
        }
      });
    });


