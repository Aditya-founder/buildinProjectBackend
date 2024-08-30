const { contactUsEmail } = require("../mail/templates/contactFormRes");
const mailSender = require("../utils/mailSender");

exports.contactUsControllers = async (req, res) => {
  const { email, name, subject, message } = req.body;

  console.log(req.body);

  try {
    const Email = "aditya.tiwari.ug22@nsut.ac.in";

    const emailReq = await mailSender(
      Email,
      "Someone wants to contact you",
      contactUsEmail(email, name, message, subject)
    );
    console.log("Email Request", emailReq);

    const emailRes = await mailSender(
      email,
      "Your data send successfully",
      contactUsEmail(email, name, message, subject)
    );
    console.log("Email Response", emailRes);
    return res.status(200).json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    console.log("Error", error);
    console.log("Error message", error.message);

    return res.json({
      success: false,
      message: "Something went wrong while contacting",
    });
  }
};
