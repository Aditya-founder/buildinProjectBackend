const Projects = require("../models/projectLinks");

exports.uploadProjectLinks = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId);

    const { projectObject } = req.body;

    console.log("project object", projectObject);

    if (!projectObject) {
      return res.status(400).json({
        success: false,
        message:
          "You have not provided any project links or the format is incorrect",
      });
    }

    // Check if a document with this userId already exists
    let userProjects = await Projects.findById(userId);

    if (userProjects) {
      // If user already exists, update their project links
      userProjects.projectLinks = projectObject;
      await userProjects.save();
    } else {
      // Otherwise, create a new document
      userProjects = await Projects.create({
        _id: userId,
        projectLinks: projectObject,
      });
    }

    console.log("Uploaded links:", userProjects);

    return res.status(200).json({
      success: true,
      message: "Links uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading project links:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to upload project links",
    });
  }
};
