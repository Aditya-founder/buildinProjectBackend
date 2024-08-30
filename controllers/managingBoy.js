const Manage = require("../models/managingModel");

exports.enterMangingBoyDetail = async (req, res) => {
  try {
    const managing_id = req.user.id;
    console.log("managing_id", managing_id);

    const {
      firstName,
      lastName,
      contactNumber,
      aadharNumber,
      pancard,
      addressline,
      country,
      state,
      pincode,
      dateOfBirth,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !contactNumber ||
      !aadharNumber ||
      !pancard ||
      !addressline ||
      !country ||
      !state ||
      !pincode ||
      !dateOfBirth
    ) {
      return res.status(400).json({
        success: true,
        message: "All details are mandatory to be filled",
      });
    }

    const searchId = await Manage.findById(managing_id);
    if (searchId) {
      return res.status(401).json({
        success: false,
        message:
          "You are already registered with us for beingassigned as a managing boy",
      });
    }

    const user = await Manage.create({
      _id: managing_id,
      firstName,
      lastName,
      contactNumber,
      aadharNumber,
      pancard,
      addressline,
      country,
      state,
      pincode,
      dateOfBirth,
    });

    console.log(user);
    return res.status(200).json({
      success: true,
      message: "Managing boy created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
};

exports.updateMangingBoyDetail = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("user_id", userId);

    const { contactNumber, addressline, country, state, pincode } = req.body;

    const details = await Manage.findByIdAndUpdate(userId, {
      contactNumber: contactNumber,
      addressline: addressline,
      country: country,
      state: state,
      pincode: pincode,
    });

    console.log(details);

    return res.status(200).json({
      success: false,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user details are not able to update successfully",
    });
  }
};
