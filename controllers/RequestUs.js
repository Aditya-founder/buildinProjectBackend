const Request = require("../models/Request");
const Engineer = require("../models/engineerProfile");
const User = require("../models/User");

exports.requestUs = async (req, res) => {
  try {
    const id = req.user.id;

    const { requestAddress, requestNumber, requestedId, type } = req.body;

    if (!requestAddress || !requestNumber) {
      return res.status(400).json({
        success: false,
        message: "It is mandatory to enter your address and contact number",
      });
    }

    if (!requestedId) {
      return res.status(400).json({
        success: false,
        message: "Sorry temporarily id of partner is not receiving",
      });
    }

    const actualPartner = await Engineer.findById(requestedId);

    const findRequestDetails = await User.findById(id);

    if (!findRequestDetails) {
      return res.status(400).json({
        success: false,
        message: "Why the user id is not showing any details regarding them",
      });
    }

    console.log(
      "Your actual booking partner details are as follows",
      actualPartner
    );

    const createRequestDetails = await Request.create({
      requestId: id,
      requestedId: requestedId,
      requestName: findRequestDetails.username,
      requestedName: actualPartner.firstname + " " + actualPartner.lastname,
      requestAddress: requestAddress,
      requestedAddress:
        actualPartner.addressline1 + " " + actualPartner.addressline2,
      requestNumber: requestNumber,
      requestedNumber: actualPartner.contactNumber,
    });

    console.log("here is the final enter details", createRequestDetails);

    return res.status(200).json({
      success: true,
      message: "Finally created the data with details",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Requesting process temporary failed",
    });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { Custom_id } = req.body;

    // Validate that Custom_id is provided
    if (!Custom_id) {
      return res.status(400).json({
        success: false,
        message: "Unable to find Custom_id",
      });
    }

    // Find the request based on the user ID
    const findFromRequest = await Request.findById(userId);

    // Check if the request was found
    if (!findFromRequest) {
      return res.status(400).json({
        success: false,
        message: "No such data for this id is there in Request",
      });
    }

    const customDetails = findFromRequest.customIds.find(
      (item) => item.Custom_id === Custom_id
    );

    // Check if the Custom_id is present in the request
    if (!customDetails) {
      return res.status(404).json({
        success: false,
        message: "Custom_id not found in the request",
      });
    }

    // If Custom_id is found, return the details
    return res.status(200).json({
      success: true,
      message: "Custom_id details found",
      data: customDetails, // Return the details of the Custom_id
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to respond on accept request",
    });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { Custom_id } = req.body;

    // Validate that Custom_id is provided
    if (!Custom_id) {
      return res.status(400).json({
        success: false,
        message: "Unable to find Custom_id",
      });
    }

    // Find the request based on the user ID
    const findFromRequest = await Request.findById(userId);

    // Check if the request was found
    if (!findFromRequest) {
      return res.status(400).json({
        success: false,
        message: "No such data for this id is there in Request",
      });
    }

    const customDetails = findFromRequest.customIds.find(
      (item) => item.Custom_id === Custom_id
    );

    // Check if the Custom_id is present in the request
    if (!customDetails) {
      return res.status(404).json({
        success: false,
        message: "Custom_id not found in the request",
      });
    }

    // If Custom_id is found, return the details
    return res.status(200).json({
      success: true,
      message: "Custom_id details found",
      data: customDetails, // Return the details of the Custom_id
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to respond on reject requst",
    });
  }
};
