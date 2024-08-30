const mongoose = require("mongoose");

const compDetailsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyOverview: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  serviceDescription: {
    type: String,
    required: true,
  },
  specializations: {
    type: String,
    required: true,
  },
  safetyProtocols: {
    type: String,
    required: true,
  },
  qualityAssurance: {
    type: String,
    required: true,
  },
  websiteLink: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("companyDetails", compDetailsSchema);
