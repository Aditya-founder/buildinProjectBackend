const RatingAndReviews = require("../models/ratingAndReviews");
const Worker = require("../models/workerProfile");
const User = require("../models/User");
const Engineer = require("../models/engineerProfile");
const Company = require("../models/companyProfile");

// createRating
exports.createWorkerRating = async (req, res) => {
  try {
    // getUserId
    const userId = req.user.id;

    // fetch data from req body
    const { rating, review, workerId } = req.body;

    // check is worker actually working there
    const workerDetails = await User.findOne({
      _id: workerId,
      connectedWorkers: { $elemMatch: { $eq: userId } },
    });

    if (!workerDetails) {
      return res.status(404).json({
        success: false,
        message: "Worker didn't works here",
      });
    }

    const alreadyReviewed = await RatingAndReviews.findOne({
      user: userId,
      worker: workerId,
    });

    if (!alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Work is already reviewed by customer",
      });
    }

    const ratingReview = await RatingAndReviews.create({
      rating,
      review,
      user: userId,
      worker: workerId,
    });

    const updatedWorkerDetails = await Worker.findByIdAndUpdate(
      workerId,
      {
        $push: {
          ratingandReviews: ratingReview._id,
        },
      },
      { new: true }
    );

    console.log(updatedWorkerDetails);

    // return response
    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Rating unable to create at this moment",
    });
  }
};

exports.createEngineerRating = async (req, res) => {
  try {
    // getUserId
    const userId = req.user.id;

    // fetch data from req body
    const { rating, review, enggId } = req.body;

    // check is worker actually working there
    const engineerDetails = await User.findOne({
      _id: enggId,
      connectedWorkers: { $elemMatch: { $eq: userId } },
    });

    if (!engineerDetails) {
      return res.status(404).json({
        success: false,
        message: "Engineer didn't works here",
      });
    }

    const alreadyReviewed = await RatingAndReviews.findOne({
      user: userId,
      worker: enggId,
    });

    if (!alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Work is already reviewed by customer",
      });
    }

    const ratingReview = await RatingAndReviews.create({
      rating,
      review,
      user: userId,
      worker: enggId,
    });

    const updatedWorkerDetails = await Engineer.findByIdAndUpdate(
      enggId,
      {
        $push: {
          ratingandReviews: ratingReview._id,
        },
      },
      { new: true }
    );

    console.log(updatedWorkerDetails);

    // return response
    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Rating unable to create at this moment",
    });
  }
};

exports.createCompanyRating = async (req, res) => {
  try {
    // getUserId
    const userId = req.user.id;

    // fetch data from req body
    const { rating, review, comapanyId } = req.body;

    // check is Company actually  contacts is there
    const companyDetails = await User.findOne({
      _id: comapanyId,
      connectedWorkers: { $elemMatch: { $eq: userId } },
    });

    if (!companyDetails) {
      return res.status(404).json({
        success: false,
        message: "Company didn't works for this guy",
      });
    }

    const alreadyReviewed = await RatingAndReviews.findOne({
      user: userId,
      worker: comapanyId,
    });

    if (!alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Company is already reviewed by customer",
      });
    }

    const ratingReview = await RatingAndReviews.create({
      rating,
      review,
      user: userId,
      worker: comapanyId,
    });

    const updatedCompanyDetails = await Company.findByIdAndUpdate(
      comapanyId,
      {
        $push: {
          ratingandReviews: ratingReview._id,
        },
      },
      { new: true }
    );

    console.log(updatedCompanyDetails);

    // return response
    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Rating unable to create at this moment",
    });
  }
};

exports.createMangingBoyRating = async (req, res) => {
  try {
    // getUserId
    const userId = req.user.id;

    // fetch data from req body
    const { rating, review, managing_id } = req.body;

    // check is Company actually  contacts is there
    const managingDetails = await User.findOne({
      _id: managing_id,
      connectedWorkers: { $elemMatch: { $eq: userId } },
    });

    if (!managingDetails) {
      return res.status(404).json({
        success: false,
        message: "This managing boy have not assigned to you",
      });
    }

    const alreadyReviewed = await RatingAndReviews.findOne({
      user: userId,
      worker: managing_id,
    });

    if (!alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Managing boy is already reviewed by customer",
      });
    }

    const ratingReview = await RatingAndReviews.create({
      rating,
      review,
      user: userId,
      worker: managing_id,
    });

    const updatedManagingDetails = await Company.findByIdAndUpdate(
      managing_id,
      {
        $push: {
          ratingandReviews: ratingReview._id,
        },
      },
      { new: true }
    );

    console.log(updatedManagingDetails);

    // return response
    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Rating unable to create at this moment",
    });
  }
};

exports.getAvgRating = async (req, res) => {
  try {
    // get worker id
    const { worker_id } = req.body;

    // calculate average rating
    const result = await RatingAndReviews.aggregate([
      {
        $match: {
          worker: new mongoose.Types.ObjectId(worker_id),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    //return rating

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Average Rating is 0 , no rating given till now",
      averageRating: 0,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "unable to access average rating",
    });
  }
};

exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReviews.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email ",
      })
      .populate({
        path: "worker",
        select: "category",
      })
      .exec();

    return res.json.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "unable to get all rating",
    });
  }
};
