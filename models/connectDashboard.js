const mongoose = require("mongoose");

const dashboardConnectSchema = new mongoose.Schema({
  requestedId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  contactNo: {
    type: Number,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("dashboardConnect", dashboardConnectSchema);
