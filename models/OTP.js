const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const emailTemplate = require("../mail/templates/emailVerification");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

// defining a function for sending email
async function sendVerificationEmail(email, otp) {
  // transporter
  // const mailResponse = await mailSender({
  //   from: "Build || Your online builder",
  //   to: `${email}`,
  //   subject: `${title}`,
  //   html: `${body}`,
  // });

  // send the email
  try {
    const mailResponse = await mailSender(
      email,
      "Verification email from Build",
      emailTemplate(otp)
    );
    console.log("Email sent Successfully : ", mailResponse.response);
  } catch (error) {
    console.log("error occured while sending email", error);
    throw error;
  }
}

OTPSchema.pre("save", async function (next) {
  console.log("New document save to the database");

  // sending message only if new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
