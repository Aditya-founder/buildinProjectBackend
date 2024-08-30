const express = require("express");
const router = express.Router();

const {
  localFileUpload,
  imageUpload,
  videoUpload,
  fileUpload,
} = require("../controllers/fileUpload");

router.post("/localUploading", localFileUpload);
router.post("/imageUploading", imageUpload);
router.post("/videoUploading", videoUpload);
router.post("/fileUploading", fileUpload);

module.exports = router;
