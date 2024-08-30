const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const mailSender = require("../utils/mailSender");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

// post middleware
fileSchema.post("save", async function (doc) {
  try {
    console.log("DOC", doc);
    const { email } = req.body;
    const title = "Hello from Build || Your online Builder";
    const body = `<p>Your file uploaded successfully</p>`;
    // calling the function
    mailSender(email, title, body)
      .then((info) => {
        console.log("Email sent successfully:", info);
      })
      .catch((error) => {
        console.error("Error sending email:", error.message);
      });

    console.log("INFO", info);
  } catch (error) {
    console.error(error);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
