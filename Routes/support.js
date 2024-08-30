const express = require("express");
const router = express.Router();
const {
  chatSupport,
  callSupport,
  checkAvailability,
} = require("../controllers/support");

const { auth, isThekedaarOrWorker } = require("../middlewares/auth");

router.post("/chatSupport", auth, isThekedaarOrWorker, chatSupport);
router.post("/callSupport", auth, isThekedaarOrWorker, callSupport);
router.post("/checkAvailability", checkAvailability);

module.exports = router;
