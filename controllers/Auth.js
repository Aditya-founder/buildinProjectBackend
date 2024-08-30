const OTP = require("../models/OTP");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const Worker = require("../models/workerProfile");
const Engineer = require("../models/engineerProfile");
const Company = require("../models/companyProfile");
const passwordUpdated = require("../mail/templates/passwordUpdate");

require("dotenv").config();

// sendotp controller
exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    // checking that is user already present
    const checkUserPresence = await User.findOne({ email });
    if (checkUserPresence) {
      return res.status(401).json({
        success: false,
        message: "User already exists by this mail Id",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("OTP generated", otp);

    const result = await OTP.findOne({ otp: otp });
    console.log("Result is generate OTP function ");
    console.log("OTP", otp);
    console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// signup controller
exports.signup = async (req, res) => {
  try {
    // data fetch from req ki body
    const { email, username, password, confirmPassword, contactNumber, otp } =
      req.body;

    //validate karlo

    if (
      !email ||
      !password ||
      !confirmPassword ||
      !contactNumber ||
      !otp ||
      !username
    ) {
      return res.status(403).send({
        //json
        success: false,
        message: "All fields are required",
      });
    }

    //2 password match karlo

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and ConfirmPassword value does not match,Please try again",
      });
    }
    //check user already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already exists , Please sign in to continue",
      });
    }

    //find the most recent OTP stored for the mail

    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);

    //validate OTP
    if (recentOtp.length === 0) {
      // OTP not found
      return res.status(400).json({
        success: false,
        message: "The otp is not valid",
      });
    } else if (otp !== recentOtp[0].otp) {
      // invalid OTP
      return res.status(400).json({
        success: false,
        message: "The otp is not valid",
      });
    }
    //HASH password

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password of signup controllers", hashedPassword);

    const user = await User.create({
      username,
      email,
      contactNumber,
      password: hashedPassword,
    });
    //return res
    return res.status(200).json({
      success: true,
      user,
      message: "User is registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered , Please try again",
    });
  }
};

// login controller
exports.login = async (req, res) => {
  try {
    // If the user is already authenticated, return the user object
    if (req.user) {
      res.set("accesstoken", req.cookies.accesstoken);
      return res.status(200).json(req.user);
    }

    const { email, password } = req.body;

    console.log("Email:", email);
    console.log("Password:", password);

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email is not registered with us",
      });
    }

    // Compare the provided password with the stored hash password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        email: user.email,
        id: user._id,
      };

      console.log("now print payload");
      console.log(payload);

      // Generate a JWT token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      console.log("Req . user kya hai", req.user);

      console.log("dkh le bhai", token);
      console.log("chk 1");
      // Save the token to the user document in the database

      user.token = token;
      user.password = undefined; // Remove password from the user object for security

      console.log("user token", user.token);
      console.log("user id", user.id);

      console.log("user ko bolu", user);

      // Set cookie for the token and return success response
      const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expires in 24 hours
        httpOnly: true, // Cookie is accessible only by the web server
      };
      // res.cookie("token", token, options);
      console.log("chk 1");
      return res.status(200).json({
        success: true,
        token,
        user,
        message: "Customer login success",
      });
    } else {
      console.log("Password is incorrect");
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
    return res.status(500).json({
      success: false,
      message: "Login failure",
    });
  }
};

// check that either email id exist or not and old password matches or not

exports.checkEmailAndOldPassword = async (req, res) => {
  try {
    const { email, password } = req.query; // Extract email and password from query parameters

    console.log("Backend me email:", email);
    console.log("Backend me password:", password);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "It is mandatory to fill all entries",
      });
    }

    // Check if this email exists or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email is not registered with us",
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    return res.status(200).json({
      success: true,
      isMatch: isMatch,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Validation failed for this email and password",
    });
  }
};

// changePassword controller
exports.changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);

    const { password, newPassword } = req.body;
    const oldpassword = await bcrypt.hash(password, 10);

    console.log("password", password);
    console.log("newPassword", newPassword);
    console.log("oldpassword", oldpassword);
    console.log("userDetail.password", userDetails.password);

    const isPasswordMatch = await bcrypt.compare(
      password,
      userDetails.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "The password is incorrect",
      });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    const updatedPassword = await User.findByIdAndUpdate(
      req.user.id,
      {
        password: encryptedPassword,
      },
      { new: true }
    );

    // sending notification email
    try {
      const emailResponse = await mailSender(
        userDetails.email,
        "password for your account has been updated",
        passwordUpdated(userDetails.email, " Password updated successfully")
      );
      console.log("Email sent successfully", emailResponse.response);
    } catch (error) {
      console.error("Error occured while sending email", error);
      return res.status(500).json({
        success: false,
        message: "Error occured while sending email",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error occured while updating password", error);
    return res.status(500).json({
      success: false,
      message: "Error occured while updating password",
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);

    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "There is a problem in deleting this account",
    });
  }
};

// logout controller
exports.logout = async (req, res) => {
  try {
  } catch (error) {
    console.log("error message is ", error);
    return res.status(500).json({
      success: false,
      message: "Logout becamee unsuccessfull",
    });
  }
};
