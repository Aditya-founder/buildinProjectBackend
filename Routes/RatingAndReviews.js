const express = require("express");
const router = express.Router();

const {
  createWorkerRating,
  createEngineerRating,
  createMangingBoyRating,
  createCompanyRating,
  getAvgRating,
  getAllRating,
} = require("../controllers/RatingAndReviews");

router.post("/createWorkerRating", createWorkerRating);
router.post("/createEngineerRating", createEngineerRating);
router.post("/createMangingBoyRating", createMangingBoyRating);
router.post("/createCompanyRating", createCompanyRating);
router.post("/gettingAvgRating", getAvgRating);
router.post("/gettingAllRating", getAllRating);

module.exports = router;
