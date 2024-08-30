const Engineer = require("../models/engineerProfile");
const About = require("../models/About");
const EngineerProfile = require("../models/engineerProfile");
const Company = require("../models/companyProfile");

// create about , message from my side and companies worked with
exports.createAbout_Message_workedWith = async (req, res) => {
  try {
    const U_id = req.user.id;
    console.log("U_id", U_id);

    // Use findOne instead of findById and search using the user ID
    const findEngineer = await EngineerProfile.findOne({ _id: U_id });

    if (!findEngineer) {
      return res.status(404).json({
        success: false,
        message:
          "You have not filled your details, it's impossible to create this without that",
      });
    }

    // Also use findOne here, because we're searching by a field other than _id
    const findUser = await About.findOne({ _id: U_id });
    if (findUser) {
      console.log("YE 400 WAALA REQUEST");
      return res.status(400).json({
        success: false,
        message:
          "User has already filled the About section and passion, please update instead of creating a new one",
      });
    }

    const name = `${findEngineer.firstName} ${findEngineer.lastName}`;
    const domain = findEngineer.category;

    const { about, messageFromMySide, companiesWorkedWith } = req.body;
    if (!about || !messageFromMySide || !companiesWorkedWith) {
      return res.status(400).json({
        success: false,
        message:
          "It is mandatory to write something in the about section and your passion",
      });
    }

    console.log("About section details", about);
    console.log("Passion section details", messageFromMySide);
    console.log("Overview section details", companiesWorkedWith);

    const aboutCreation = await About.create({
      _id: U_id,
      name,
      domain,
      about,
      messageFromMySide,
      companiesWorked: companiesWorkedWith,
    });
    console.log(aboutCreation);
    return res.status(200).json({
      success: true,
      message: "Successfully created this section",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to fill the About section currently! Please try again",
    });
  }
};

// updating about section
exports.updateAbout = async (req, res) => {
  try {
    const U_id = req.user.id;
    console.log("what is the usr id", U_id);

    const { aboutData } = req.body;

    console.log("What is the about section ", aboutData);

    const findEngineer = await EngineerProfile.findOne({ _id: U_id });

    if (!findEngineer) {
      return res.status(400).json({
        success: false,
        message: `There is no engineer having id ${U_id}`,
      });
    }

    const updatedAboutSectionOfEngineer = await About.findByIdAndUpdate(
      { _id: U_id },
      {
        about: aboutData,
      },
      { new: true }
    );

    console.log("updated about details", updatedAboutSectionOfEngineer);

    return res.status(200).json({
      success: true,
      message: `Successfully updated the about section of Engineer id ${U_id}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failure in update about section",
    });
  }
};

// updating message from my side section
exports.updateMessageSection = async (req, res) => {
  try {
    const U_id = req.user.id;
    console.log("what is the usr id", U_id);

    const { messageData } = req.body;

    console.log("What is the message from your side ", messageData);

    const findEngineer = await EngineerProfile.findOne({ _id: U_id });

    if (!findEngineer) {
      return res.status(400).json({
        success: false,
        message: `There is no engineer having id ${U_id}`,
      });
    }

    const updatedMessageSectionOfEngineer = await About.findByIdAndUpdate(
      { _id: U_id },
      {
        messageFromMySide: messageData,
      },
      { new: true }
    );

    console.log(
      "updated message section details",
      updatedMessageSectionOfEngineer
    );

    return res.status(200).json({
      success: true,
      message: `Successfully updated the message section of Engineer id ${U_id}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failure in update message section",
    });
  }
};

// updating companies i worked with section
exports.updateCompaniesIWorkedWith = async (req, res) => {
  try {
    const U_id = req.user.id;
    console.log("User ID:", U_id);

    const { companiesWorkedWith } = req.body;

    console.log("Companies Worked With:", companiesWorkedWith);

    const findEngineer = await EngineerProfile.findOne({ _id: U_id });

    if (!findEngineer) {
      return res.status(400).json({
        success: false,
        message: `No engineer found with ID ${U_id}`,
      });
    }

    const updatedCompaniesSectionOfEngineer = await About.findByIdAndUpdate(
      U_id,
      { companiesWorked: companiesWorkedWith },
      { new: true }
    );

    console.log("Updated companies:", updatedCompaniesSectionOfEngineer);

    return res.status(200).json({
      success: true,
      message: `Successfully updated companies section for Engineer ID ${U_id}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update past worked companies section",
    });
  }
};
