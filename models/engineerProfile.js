const mongoose = require("mongoose");

const enggSchema = new mongoose.Schema(
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
    experience: {
      type: Number,
      required: true,
      trim: true,
    },
    educatedFrom: {
      type: String,
      required: true,
      trim: true,
    },

    // serviceChargePerDay: {
    //   type: Number,
    //   required: true,
    //   trim: true,
    // },
    // serviceChargePerHour: {
    //   type: Number,
    //   required: true,
    //   trim: true,
    // },
    category: {
      type: String,
      enum: ["architectEngineer", "civilEngineer"],
      required: true,
    },
    yearOfPassing: {
      type: Number,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
      trim: true,
    },
    residentialProjects: {
      type: String,
      required: true,
    },
    commercialProjects: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("engineerProfile", enggSchema);
