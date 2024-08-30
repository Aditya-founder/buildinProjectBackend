const express = require("express");
const router = express.Router();

const {
  connectUser,
  disconnectUser,
  search,
  dashboardConnect,
} = require("../controllers/connect");
const { auth } = require("../middlewares/auth");

router.post("/connect", auth, connectUser);
router.post("/disconnect", auth, disconnectUser);
router.post("/search", auth, search);
router.post("/dashboard-request", auth, dashboardConnect);

module.exports = router;
