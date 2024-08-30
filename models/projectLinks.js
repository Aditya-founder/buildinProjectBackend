const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectLinks: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("projects", projectSchema);
