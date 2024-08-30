const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
  },
  requestedId: {
    type: String,
    required: true,
  },
  requestName: {
    type: String,
    required: true,
    trim: true,
  },
  requestedName: {
    type: String,
    required: true,
    trim: true,
  },
  requestAddress: {
    type: String,
    required: true,
  },
  requestedAddress: {
    type: String,
    required: true,
  },
  requestNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  requestedNumber: {
    type: Number,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("request", requestSchema);
