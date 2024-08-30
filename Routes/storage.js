const express = require("express");
const router = express.Router();
const {
  createAbout_Message_workedWith,
  updateAbout,
  updateMessageSection,
  updateCompaniesIWorkedWith,
} = require("../controllers/storage");

const { auth } = require("../middlewares/auth");

router.post("/about", auth, createAbout_Message_workedWith);
router.post("/update-about-section", auth, updateAbout);
router.post("/update-message-section", auth, updateMessageSection);
router.post(
  "/update-comapnies-you-worked-with",
  auth,
  updateCompaniesIWorkedWith
);

module.exports = router;
