const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
    trim: true,
  },

  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
  },
  connectedWorkers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
