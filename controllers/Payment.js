const { instance } = require("../config/razorPay");
const User = require("../models/User");
const Worker = require("../models/workerProfile");
const Engineer = require("../models/engineerProfile");
const Company = require("../models/companyProfile");
const crypto = require("crypto");
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");

exports.captureServicePayment = async (req, res) => {
  try {
    const user_id = req.user.id;
    console.log(user_id);

    const { Workerid, noOfBookingDays } = req.body;

    let total_amount = 0;

    const WorkerId = await Worker.findById(Workerid);

    // discounts
    if (!noOfBookingDays) {
      total_amount += WorkerId.serviceCharge;
    } else {
      if (noOfBookingDays === 0) {
        total_amount += WorkerId.serviceChargePerHour;
      } else if (noOfBookingDays === 1) {
        total_amount += WorkerId.serviceChargePerday;
      } else {
        total_amount += WorkerId.serviceChargePerday * noOfBookingDays * 0.9;
      }
    }

    const options = {
      amount: total_amount * 100,
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),
    };

    try {
      // initiate the payment using razorpay
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);
      res.json({
        success: true,
        data: paymentResponse,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "could not initiate order",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "payment capture fails",
    });
  }
};

exports.captureSubscriptionPayment = async (req, res) => {
  const subscription_id = req.user.id;

  // subscription cost of different categories
  let subscriptionCost;
  if (subscription_id.category === "architectEngineerCompany") {
    subscriptionCost = 100;
  } else if (subscription_id.category === "civilEngineerCompany") {
    subscriptionCost = 200;
  } else if (subscription_id.category === "interiorDesignerCompany") {
    subscriptionCost = 300;
  } else if (subscription_id.category === "builderCompany") {
    subscriptionCost = 400;
  } else if (subscription_id.category === "thekedaar") {
    subscriptionCost = 500;
  }

  const options = {
    amount: subscriptionCost * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    // Initiate the payment using razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate order",
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const category = req.body?.category;

    const user_id = req.user.id;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !user_id ||
      !category
    ) {
      res.status(401).json({
        success: false,
        message: "Payment failed",
      });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // i have to write here the logic that either payment for commission model is done or enable the subscription subscriber
      return res.status(200).json({
        success: true,
        message: "Payment Verified",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Payment Failed",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "payment verification get fails",
    });
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(400).json({
      success: false,
      messaage: "Please provide all the details",
    });
  }

  try {
    const connectCustomer = await User.findById(userId);

    await mailSender(
      connectCustomer.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${connectCustomer.firstName}${connectCustomer.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Culd not send Email",
    });
  }
};
