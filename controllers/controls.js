const User = require("../models/User");
const Worker = require("../models/workerProfile");
const Engineer = require("../models/engineerProfile");
const Company = require("../models/companyProfile");
const CompanyBlog = require("../models/companyDetails");
const bcrypt = require("bcryptjs");

exports.fillWorkers_ThekedaarDetails = async (req, res) => {
  try {
    console.log("create me check karo", req.user);

    const custom_id = req.user.id;
    console.log("Id is ", custom_id);

    const country = "India";

    const {
      firstName,
      lastName,
      state,
      pincode,
      addressline1,
      addressline2,
      contactNumber,
      aadharNumber,
      category,
      dateOfBirth,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !state ||
      !pincode ||
      !addressline1 ||
      !addressline2 ||
      !contactNumber ||
      !aadharNumber ||
      !category ||
      !dateOfBirth
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required to be filled except addressline 2",
      });
    }

    const searchId = await Worker.findById(custom_id);
    if (searchId) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const user = await Worker.create({
      _id: custom_id,
      firstName,
      lastName,
      contactNumber,
      country,
      state,
      pincode,
      addressline1,
      addressline2,
      aadharNumber,
      category,
      dateOfBirth,
    });
    console.log(user);

    return res.status(200).json({
      success: true,
      message: "User details added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User details unable to be added. Please try again",
    });
  }
};

exports.fillEngineerDetails = async (req, res) => {
  try {
    const custom_id = req.user.id;
    console.log("Id is ", custom_id);

    const country = "India";

    const {
      firstName,
      lastName,
      state,
      pincode,
      addressline1,
      addressline2,
      contactNumber,
      experience,
      category,
      educatedFrom,
      yearOfPassing,
      dateOfBirth,
      residentialProjects,
      commercialProjects,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !state ||
      !pincode ||
      !addressline1 ||
      !addressline2 ||
      !contactNumber ||
      !experience ||
      !category ||
      !educatedFrom ||
      !yearOfPassing ||
      !dateOfBirth ||
      !residentialProjects ||
      !commercialProjects
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required to be filled",
      });
    }

    const searchId = await Engineer.findById(custom_id);
    if (searchId) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await Engineer.create({
      _id: custom_id,
      firstName,
      lastName,
      country,
      state,
      pincode,
      addressline1,
      addressline2,
      contactNumber,
      experience,
      category,
      educatedFrom,
      yearOfPassing,
      dateOfBirth,
      residentialProjects,
      commercialProjects,
    });
    console.log(user);

    return res.status(200).json({
      success: true,
      message: "User details added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User details unable to be added. Please try again",
    });
  }
};

exports.fillCompanydetails = async (req, res) => {
  try {
    const custom_id = req.user.id;
    console.log("Id is ", custom_id);

    const country = "India";

    const {
      companyName,
      state,
      pincode,
      addressline1,
      addressline2,
      contactNumber,
      description,
      tellUsAboutYourCompany,
      category,
    } = req.body;

    if (
      !companyName ||
      !state ||
      !pincode ||
      !tellUsAboutYourCompany ||
      !addressline1 ||
      !addressline2 ||
      !contactNumber ||
      !description ||
      !category
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required to be filled except addressline 2",
      });
    }

    const searchId = await Company.findById(custom_id);
    if (searchId) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await Company.create({
      _id: custom_id,
      companyName,
      country,
      state,
      pincode,
      addressline1,
      addressline2,
      contactNumber,
      category,
      tellUsAboutYourCompany,
      description,
    });
    console.log(user);

    return res.status(200).json({
      success: true,
      message: "User details added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Companies data unable to be added. Please try again",
    });
  }
};

exports.fillCompanyBlogDetails = async (req, res) => {
  try {
    const custom_id = req.user.id;
    console.log("Id is ", custom_id);

    const {
      companyName,
      overview,
      mission,
      vision,
      services,
      specializations,
      safetyProtocols,
      qualityAssurance,
      websiteLink,
    } = req.body;

    console.log("ye le bhaiya", companyName);

    if (
      !companyName ||
      !overview ||
      !mission ||
      !vision ||
      !services ||
      !specializations ||
      !safetyProtocols ||
      !qualityAssurance ||
      !websiteLink
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required to be filled ",
      });
    }

    const findCompany = await CompanyBlog.findById({ _id: custom_id });

    if (findCompany) {
      return res.status(400).json({
        success: true,
        message: "You have already responded",
      });
    }

    const companiesDetails = await CompanyBlog.create({
      _id: custom_id,
      companyName,
      companyOverview: overview,
      mission,
      vision,
      serviceDescription: services,
      specializations,
      safetyProtocols,
      qualityAssurance,
      websiteLink,
    });
    console.log(companiesDetails);

    return res.status(200).json({
      success: true,
      message: "Company Blog details added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Companies data unable to be added. Please try again",
    });
  }
};

exports.updateEngineerDetails = async (req, res) => {
  try {
    const U_id = req.user.id;
    const { formData } = req.body;

    console.log("What is the id", U_id);
    console.log("What is formData", formData);

    const findEngineer = await Engineer.findOne({ _id: U_id });
    if (!findEngineer) {
      return res.status(400).json({
        success: false,
        message: `No such user exists with id ${U_id}`,
      });
    }

    // Create an update object
    const updateData = {};

    // Only add fields to updateData if they exist in formData
    if (formData.addressline1) updateData.addressline1 = formData.addressline1;
    if (formData.pincode) updateData.pincode = formData.pincode;
    if (formData.addressline2) updateData.addressline2 = formData.addressline2;
    if (formData.state) updateData.state = formData.state;
    if (formData.experience) updateData.experience = formData.experience;
    if (formData.category) updateData.category = formData.category;
    if (formData.residentialProjects)
      updateData.residentialProjects = formData.residentialProjects;
    if (formData.commercialProjects)
      updateData.commercialProjects = formData.commercialProjects;

    // Update the engineer's details
    const updatedDetailsForEngineer = await Engineer.findByIdAndUpdate(
      U_id,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Engineer details updated successfully",
      data: updatedDetailsForEngineer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to update details at this moment",
    });
  }
};

exports.updateCompanyDetails = async (req, res) => {
  try {
    const U_id = req.user.id;
    const { formData } = req.body;

    console.log("What is the id", U_id);
    console.log("What is formData", formData);

    const findCompany = await Company.findOne({ _id: U_id });
    if (!findCompany) {
      return res.status(400).json({
        success: false,
        message: `No such user exists with id ${U_id}`,
      });
    }

    // Create an update object
    const updateData = {};

    // Only add fields to updateData if they exist in formData
    if (formData.addressline1) updateData.addressline1 = formData.addressline1;
    if (formData.pincode) updateData.pincode = formData.pincode;
    if (formData.addressline2) updateData.addressline2 = formData.addressline2;
    if (formData.state) updateData.state = formData.state;
    if (formData.companyName) updateData.companyName = formData.companyName;
    if (formData.category) updateData.category = formData.category;
    if (formData.description) updateData.description = formData.description;

    // Update the engineer's details
    const updatedDetailsForCompany = await Company.findByIdAndUpdate(
      U_id,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Company details updated successfully",
      data: updatedDetailsForCompany,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch company details",
    });
  }
};

exports.updateThekedaar_WorkerDetails = async (req, res) => {
  try {
    const U_id = req.user.id;
    const { formData } = req.body;

    console.log("What is the id", U_id);
    console.log("What is formData", formData);

    const findWorker = await Worker.findOne({ _id: U_id });
    if (!findWorker) {
      return res.status(400).json({
        success: false,
        message: `No such user exists with id ${U_id}`,
      });
    }

    // Create an update object
    const updateData = {};

    // Only add fields to updateData if they exist in formData
    if (formData.addressline1) updateData.addressline1 = formData.addressline1;
    if (formData.pincode) updateData.pincode = formData.pincode;
    if (formData.addressline2) updateData.addressline2 = formData.addressline2;
    if (formData.state) updateData.state = formData.state;
    if (formData.category) updateData.category = formData.category;

    // Update the engineer's details
    const updatedDetailsForWorkers = await Worker.findByIdAndUpdate(
      U_id,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Workers details updated successfully",
      data: updatedDetailsForWorkers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to update details of respective details",
    });
  }
};

exports.checkUserWrtId = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Id is mandatory for this",
      });
    }

    let findUser;

    findUser = await Worker.findById(id);

    if (findUser) {
      return res.status(200).json({
        success: true,
        message: "Finally this id is of worker section",
        data: "Workers",
      });
    }

    findUser = await Engineer.findById(id);

    if (findUser) {
      return res.status(200).json({
        success: true,
        message: "Finally this id is of Engineer section",
        data: "Engineers",
      });
    }

    findUser = await Company.findById(id);

    if (findUser) {
      return res.status(200).json({
        success: true,
        message: "Finally this id is of Company section",
        data: "Company",
      });
    }

    return res.status(400).json({
      success: false,
      messsage: "No such data with this id is there",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch id data",
    });
  }
};
