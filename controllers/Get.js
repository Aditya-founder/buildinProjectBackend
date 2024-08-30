const Engineers = require("../models/engineerProfile");
const Companies = require("../models/companyProfile");
const Workers_Thekedaars = require("../models/workerProfile");
const AboutMessageWorkedWith = require("../models/About");
const CompanyBlog = require("../models/companyDetails");
const ConnectDashboard = require("../models/connectDashboard");
const mongoose = require("mongoose");

exports.fetchEngineer = async (req, res) => {
  try {
    const requireEngineer = await Engineers.find({});
    if (!requireEngineer.length) {
      return res.status(404).json({ message: "No engineers found" });
    }

    console.log(requireEngineer);

    return res.status(200).json({
      success: true,
      requireEngineer,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch engineer data",
    });
  }
};

exports.fetchCompanies = async (req, res) => {
  try {
    const requireCompanies = await Companies.find({});
    if (!requireCompanies.length) {
      return res.status(404).json({ message: "No companies found" });
    }

    console.log(requireCompanies);

    return res.status(200).json({
      success: true,
      requireCompanies,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch companies data",
    });
  }
};

exports.fetchworkerThekedaar = async (req, res) => {
  try {
    const requireWorker_Thekedaar = await Workers_Thekedaars.find({});
    if (!requireWorker_Thekedaar.length) {
      return res.status(404).json({ message: "No Data found" });
    }

    console.log(requireWorker_Thekedaar);

    return res.status(200).json({
      success: true,
      requireWorker_Thekedaar,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch  data",
    });
  }
};

exports.getAboutMessageWorkedWith = async (req, res) => {
  try {
    const findProfile = await AboutMessageWorkedWith.find({});
    if (!findProfile.length) {
      return res.status(404).json({ message: "No engineers found" });
    }
    if (!findProfile) {
      return res.status(400).json({
        success: false,
        message: "Sorry temporary unable to fetch data of this id",
      });
    }

    console.log("is id waale ka information ye hai", findProfile);

    return res.status(200).json({
      success: true,
      findProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleAboutMessageWorkedWith = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    console.log("about section id", id);

    const findSingleProfile = await AboutMessageWorkedWith.findById(id);

    if (!findSingleProfile) {
      return res.status(400).json({
        success: false,
        message: "No such ID exists",
      });
    }

    console.log("Here is the single profile", findSingleProfile);

    return res.status(200).json({
      success: true,
      findSingleProfile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch data",
    });
  }
};

// fetch only painters
exports.onlyPainter = async (req, res) => {
  try {
    const findPainter = await Workers_Thekedaars.find({ category: "painter" });

    if (findPainter.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No such painters data found",
      });
    }

    console.log("here are the required painters", findPainter);

    return res.status(200).json({
      status: true,
      data: findPainter,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to fetch painter data",
    });
  }
};

// fetch only plumbers
exports.onlyPlumbers = async (req, res) => {
  try {
    const findPlumber = await Workers_Thekedaars.find({ category: "plumber" });

    if (findPlumber.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No such plumbers data found",
      });
    }

    console.log("here are the required plumbers", findPlumber);

    return res.status(200).json({
      status: true,
      data: findPlumber,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to fetch plumbers data",
    });
  }
};

// fetch only marble workers
exports.onlyMarbleWorkers = async (req, res) => {
  try {
    const findMarbleWorkers = await Workers_Thekedaars.find({
      category: "marbleWorker",
    });

    if (findMarbleWorkers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No such Marble Workers data found",
      });
    }

    console.log("here are the required marble workers", findMarbleWorkers);

    return res.status(200).json({
      status: true,
      data: findMarbleWorkers,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to fetch marble workers data",
    });
  }
};

// fetch only electrician
exports.onlyElectricians = async (req, res) => {
  try {
    const findElectricians = await Workers_Thekedaars.find({
      category: "electrician",
    });

    if (findElectricians.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No such electricians data found",
      });
    }

    console.log("here are the required electricians", findElectricians);

    return res.status(200).json({
      status: true,
      data: findElectricians,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to fetch electricians data",
    });
  }
};

// fetch only Interior designers
exports.onlyInteriorDesigners = async (req, res) => {
  try {
    const findInteriorDesigners = await Workers_Thekedaars.find({
      category: "interiorDesigner",
    });

    if (findInteriorDesigners.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No such interior designers data found",
      });
    }

    console.log(
      "here are the required interior designers",
      findInteriorDesigners
    );

    return res.status(200).json({
      status: true,
      data: findInteriorDesigners,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to fetch interior designers data",
    });
  }
};

// fetch only Contractors
exports.onlyContractors = async (req, res) => {
  try {
    const findContractors = await Workers_Thekedaars.find({
      category: "thekedaar",
    });

    if (findContractors.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No such contractors data found",
      });
    }

    console.log("here are the required contractors", findContractors);

    return res.status(200).json({
      status: true,
      data: findContractors,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to fetch contractors data",
    });
  }
};

// fetch onlyMasonWorker
exports.onlyMasonWorker = async (req, res) => {
  try {
    const findMasons = await Workers_Thekedaars.find({
      category: "mason",
    });

    if (findMasons.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No such Mason data found",
      });
    }

    console.log("here are the required Masons", findMasons);

    return res.status(200).json({
      status: true,
      data: findMasons,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to fetch Masons data",
    });
  }
};

// fetch all company blog details
exports.allCompanyBlog = async (req, res) => {
  try {
    const findCompany = await CompanyBlog.find();

    if (!findCompany) {
      return res.status(400).json({
        success: false,
        message: "Company blog is unable to fetch",
      });
    }

    console.log("All company blog details", findCompany);

    return res.status(200).json({
      success: true,
      findCompany,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch company blog",
    });
  }
};

// fetch single company blog details
exports.singleCompanyBlog = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    console.log("Company details section ID:", id);

    const findCompany = await CompanyBlog.findById(id);
    console.log("Company details found:", findCompany);

    if (!findCompany) {
      return res.status(404).json({
        success: false,
        message: "No company details found",
      });
    }

    return res.status(200).json({
      success: true,
      findCompany,
    });
  } catch (error) {
    console.error("Error fetching company details:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch the data",
    });
  }
};

exports.getDashboardData = async (req, res) => {
  const findDashboardRequest = await ConnectDashboard.find();
  if (findDashboardRequest.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No such request found in connect dashboard",
    });
  }

  console.log("All dashboard details", findDashboardRequest);

  return res.status(200).json({
    success: true,
    findDashboardRequest,
  });
};

exports.getDashboardDataId = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is undefined",
      });
    }

    const findDashboardRequestById = await ConnectDashboard.findById(id);
    if (!findDashboardRequestById) {
      return res.status(400).json({
        success: false,
        message: "No such request found in connect dashboard",
      });
    }

    return res.status(200).json({
      success: true,
      findDashboardRequestById,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to find the specific id data",
    });
  }
};

exports.getWorkerByid = async (req, res) => {
  try {
    // Extracting id from the query
    let { id } = req.query;

    console.log("Received id:", id); // Check what the id is before any processing

    // Ensure id is sanitized
    id = id.trim(); // Remove any leading/trailing spaces
    if (id.startsWith(":")) {
      id = id.substring(1); // Remove the leading colon if present
    }

    console.log("Sanitized id:", id); // Log sanitized id

    // Check if id is present after sanitization
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is compulsory for searching data",
      });
    }

    // Validate the id as a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    // Find worker by ID
    const findSingleWorker = await Workers_Thekedaars.findById(id);
    if (!findSingleWorker) {
      return res.status(404).json({
        success: false,
        message: "No such worker exists",
      });
    }

    console.log("Worker successfully found:", findSingleWorker);

    return res.status(200).json({
      success: true,
      message: "Data fetched for the given id",
      data: findSingleWorker,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch data",
    });
  }
};
