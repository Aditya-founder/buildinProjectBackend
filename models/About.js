const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  messageFromMySide: {
    type: String,
    required: true,
  },
  companiesWorked: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("about", aboutSchema);
