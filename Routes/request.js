const express = require("express");
const router = express.Router();

const {
  requestUs,
  acceptRequest,
  rejectRequest,
} = require("../controllers/RequestUs");

const { auth } = require("../middlewares/auth");

router.post("/request-dashboard", auth, requestUs);
router.post("/accept-dashboard", acceptRequest);
router.post("/reject-dashboard", rejectRequest);

module.exports = router;
