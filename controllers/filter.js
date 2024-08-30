const User = require("../models/User");
const Engineer = require("../models/engineerProfile");
const Worker = require("../models/workerProfile");
const Company = require("../models/companyProfile");

exports.engineer = async (req, res) => {
  try {
    const { minExperience, residentialProjects, commercialProjects, category } =
      req.query;

    if (!category) {
      return res.status(401).json({
        success: false,
        message: "Category filled is mandatory for filling",
      });
    }

    // constructing the filtering object
    const filterData = {
      experience: {
        $gte: minExperience ? parseInt(minExperience) : 0,
      },
      residentialProjects: residentialProjects
        ? parseInt(residentialProjects)
        : { $exists: true },
      commercialProjects: commercialProjects
        ? parseInt(commercialProjects)
        : { $exists: true },
      category: `${category}`,
    };

    // query the database with the constructed filters
    const filteredWorkers = await Engineer.find(filterData).exec();

    console.log("what will be the ", filteredWorkers);

    if (Object.keys(filteredWorkers).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No such Engineer found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Required engineers fetched successfully",
        data: filteredWorkers,
      });
    }
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({
      success: false,
      message: "Engineer filter is unable to fetch data successfuly",
    });
  }
};

// Controller to handle fetching workers based on state, city, and pincode

exports.servicer = async (req, res) => {
  try {
    // Extract query parameters from the request
    const { state, city, pincode } = req.query;

    // Construct the filter object dynamically
    const filterData = {};

    if (state) {
      filterData.state = state; // Add state to filter if provided
    }

    if (city) {
      filterData.city = city; // Add city to filter if provided
    }

    if (pincode) {
      filterData.pincode = pincode; // Add pincode to filter if provided
    }

    // If no parameters provided, return all workers
    const workers = await Worker.find(filterData).exec();

    // Check if any workers are found
    if (workers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No workers found matching the provided criteria.",
      });
    }

    console.log("check total required data", workers);

    // If workers are found, return them in the response
    return res.status(200).json({
      success: true,
      message: "Workers fetched successfully",
      data: workers,
    });
  } catch (error) {
    // Handle any errors during the process
    console.error("Error fetching workers:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching workers",
      error: error.message,
    });
  }
};

exports.company = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is mandatory to be filled",
      });
    }

    const filterData = {
      category: `${category}`,
    };

    const filteredCompany = await Company.find(filterData).exec();

    if (Object.keys(filteredCompany).length === 0) {
      console.log("check 1");
      return res.status(400).json({
        success: false,
        message: "No such category exists",
      });
      console.log("check 2");
    }

    console.log("check 3");

    console.log("filtered company", filteredCompany);

    return res.status(200).json({
      success: true,
      message: "Required companies fetched successfully",
      data: filteredCompany,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Company data are unable to fetched successfully",
    });
  }
};

exports.locateEngineer = async (req, res) => {
  try {
    // Extract query parameters from the request
    const { state, city, pincode } = req.query;

    // Construct the filter object dynamically
    const filterData = {};

    if (state) {
      filterData.state = state; // Add state to filter if provided
    }

    if (city) {
      filterData.city = city; // Add city to filter if provided
    }

    if (pincode) {
      filterData.pincode = pincode; // Add pincode to filter if provided
    }

    // If no parameters provided, return all workers
    const engineers = await Engineer.find(filterData).exec();

    // Check if any workers are found
    if (engineers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No engineers found matching the provided criteria.",
      });
    }

    console.log("check total required data", engineers);

    // If workers are found, return them in the response
    return res.status(200).json({
      success: true,
      message: "Engineers fetched successfully",
      data: engineers,
    });
  } catch (error) {
    // Handle any errors during the process
    console.error("Error fetching workers:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching engineers",
      error: error.message,
    });
  }
};

exports.locateWorker = async (req, res) => {
  try {
    // Use req.params to get the state from the URL
    const { state } = req.params;

    if (!state) {
      return res.status(400).json({
        success: false,
        message: "Entering the state is required",
      });
    }

    // Correct way to search using the state
    const filteredWorkers = await Worker.find({ state }).exec();

    if (!filteredWorkers || filteredWorkers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No such worker exists",
      });
    }

    console.log("Filtered Workers are", filteredWorkers);

    return res.status(200).json({
      success: true,
      message: `Workers for ${state} fetched successfully`,
      requireWorker_Thekedaar: filteredWorkers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Location fetching became unsuccessful",
      error: error.message,
    });
  }
};
