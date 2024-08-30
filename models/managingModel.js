const mongoose = require("mongoose");

const managingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  contactNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  aadharNumber: {
    type: String,
    required: true,
    trim: true,
  },
  pancard: {
    type: String,
    trim: true,
  },
  addressline: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: Number,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
    trim: true,
  },
  ratingandReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReviews",
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
  approved: {
    type: Boolean,
    // required: true,
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("managing", managingSchema);
