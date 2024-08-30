const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  sendotp,
  changePassword,
  deleteAccount,
  checkEmailAndOldPassword,
} = require("../controllers/Auth");

const { updateMangingBoyDetail } = require("../controllers/managingBoy");

const { auth } = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/login-system", auth, login);
router.post("/sendotp", sendotp);
router.post("/changePassword", auth, changePassword);
router.post("/deleteAccount", auth, deleteAccount);

router.post("/updateMangingBoyDetail", auth, updateMangingBoyDetail);
router.get("/check-email-password", checkEmailAndOldPassword);

module.exports = router;
