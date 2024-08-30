const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");
const { uploadProjectLinks } = require("../controllers/projects");

router.post("/project-links", auth, uploadProjectLinks);

module.exports = router;
