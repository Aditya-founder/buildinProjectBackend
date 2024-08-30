const mongoose = require("mongoose");

const profileimageDetailsSchema = new mongoose.Schema(
  {
    image: String,
  },
  { collection: "ProfileImageDetails" }
);

mongoose.model("ProfileImageDetails", profileimageDetailsSchema);
