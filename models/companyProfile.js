const mongoose = require("mongoose");

const compSchema = new mongoose.Schema(
  {
    companyName: {
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
    description: {
      type: String,
      required: true,
    },
    tellUsAboutYourCompany: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "architectEngineerCompany",
        "civilEngineerCompany",
        "interiorDesignerCompany",
        "builderCompany",
        "plumbersCompany",
        "marbleCompany",
        "paintersCompany",
        "electriciansCompany",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("companyProfile", compSchema);
