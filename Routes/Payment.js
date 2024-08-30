const express = require("express");
const router = express.Router();

const {
  captureServicePayment,
  captureSubscriptionPayment,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/Payment");

router.post("/captureServicePayment", captureServicePayment);
router.post("/captureSubscriptionPayment", captureSubscriptionPayment);
router.post("/verifyingPayment", verifyPayment);
router.post("/sendingPaymentSuccessEmail", sendPaymentSuccessEmail);

module.exports = router;
