const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
  try {
    // Extract the token from the request headers
    // console.log("request ko bhi check karo ", req);
    // const token = req.headers["accesstoken"];

    const token = req.cookies.accessToken;
    // console.log("what is the dummy token", dummyToken);

    console.log("is token here", token);

    // If the token is missing, return a 401 response

    // Verify the token
    try {
      if (!token) {
        next();
      } else {
        console.log("aa gya yaar", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded will be ", decoded);
        req.user = decoded; // Attach the decoded token payload to the request object
        console.log("user ko bolu", req.user);
        next(); // Pass control to the next middleware or route handler
      }
    } catch (error) {
      // If token verification fails, return a 401 response
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (error) {
    console.error("An error occurred while validating the token:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};
// isThekedaarorWorker
exports.isThekedaarOrWorker = async (req, res) => {
  try {
    if (
      req.user.accountType !== "Thekedaar" ||
      req.user.accountType !== "Worker"
    ) {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Thekedaars or workers only",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User role cannot be verified please try again",
    });
  }
};

// isAdmin
exports.isAdmin = async (req, res) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User role cannot be verified please try again",
    });
  }
};

// isengineer
exports.isEngineer = async (req, res) => {
  try {
    if (req.user.accountType !== "Engineer") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Engineer only",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User role cannot be verified please try again",
    });
  }
};

// isCompany
exports.isCompany = async (req, res) => {
  try {
    if (req.user.accountType !== "Company") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Company only",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User role cannot be verified please try again",
    });
  }
};

// is managing boy
exports.isManagingBoy = async (req, res) => {
  try {
    if (req.user.accountType !== "managingboy") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Managing boy only",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User role cannot be verified please try again",
    });
  }
};
