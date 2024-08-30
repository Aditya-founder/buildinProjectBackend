const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
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
    addressline1: {
      type: String,
      required: true,
    },
    addressline2: {
      type: String,
      required: true,
    },
    aadharNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "electrician",
        "painter",
        "marbleWorker",
        "plumber",
        "interiorDesigner",
        "thekedaar",
        "mason",
      ],
      required: true,
    },
    // serviceChargePerday: {
    //   type: Number,
    //   required: true,
    //   trim: true,
    // },
    // serviceChargePerHour: {
    //   type: Number,
    //   required: true,
    //   trim: true,
    // },
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("workerProfile", workSchema);
