const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localFile upload handler function

exports.localFileUpload = async (req, res) => {
  try {
    // fetch files fro request
    const file = req.files.file;
    console.log("File aagyi jee ->", file);

    // create path where file need to be stored on server
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("PATH->", path);

    // add path to move function
    file.mv(path, (err) => {
      console.log(err);
    });

    // create a successful response
    res.json({
      success: true,
      message: "Local File Uploaded Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "File unable to load on local server",
    });
  }
};

// image upload ka handler ke liye functions
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  console.log("temp file path->", file.tempFilePath);

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image uploading handler function
exports.imageUpload = async (req, res) => {
  try {
    // const custom_id = req.user.id;
    // console.log("Id", custom_id);

    // data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    // but agar file format supported hai
    console.log("uploading to file upload of cloudinary");
    const response = await uploadFileToCloudinary(file, "fileupload");
    console.log(response);

    // db me entry save karni hai
    const fileData = await File.create({
      name,
      tags,
      email,
      // id: custom_id,
      imageUrl: response.secure_url,
    });

    return res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "image successfully uploaded",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "image unable to upload on cloudinary",
    });
  }
};

// video uploading handler function
exports.videoUpload = async (req, res) => {
  try {
    const custom_id = req.user.id;
    console.log("Id", custom_id);

    // data fetching
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFiles;

    // validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    // but agar file format supported hai
    console.log("uploading to fileupload of cloudinary");
    const response = await uploadFileToCloudinary(file, "fileupload");
    console.log(response);

    // db me entry save karni hai
    const videofileData = await File.create({
      name,
      tags,
      email,
      id: custom_id,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "video successfully uploaded",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "video unable to upload on cloudinary",
    });
  }
};

exports.fileUpload = async (req, res) => {
  try {
    const id = req.user.id;
    console.log("Id", id);

    // data fetching
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.docfiles;

    // validation
    const supportedTypes = ["pdf"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "olny pdf files are supported",
      });
    }

    // but agar file format supported hai
    console.log("uploading to fileupload od cloudinary");
    const response = await uploadFileToCloudinary(file, "fileUpload");
    console.log(response);

    // db me entry save karni hai
    const fileData = await File.create({
      name,
      tags,
      email,
      id,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      message: "file uploaded successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "file unable to upload on cloudinary",
    });
  }
};
