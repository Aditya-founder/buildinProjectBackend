const User = require("../models/User");
const DashboardConnect = require("../models/connectDashboard");

exports.connectUser = async (req, res) => {
  try {
    const customer_id = req.user.id;
    console.log("customer id is ", customer_id);

    const { workerId } = req.body;

    if (customer_id == workerId) {
      return res.status(400).json({
        success: false,
        message: "You cannot add or remove yourself",
      });
    }

    const customer = await User.findById(customer_id);
    const isWorkerConnected = customer.connectedWorkers.includes(workerId);

    if (isWorkerConnected) {
      console.log("This service man  is already connected with you.");
    } else {
      const updatedCustomer = await User.findByIdAndUpdate(
        { _id: customer_id },
        {
          $push: { connectedWorkers: workerId },
        },
        { new: true }
      );

      const updatedWorker = await User.findByIdAndUpdate(
        { _id: workerId },
        {
          $push: { connectedWorkers: customer_id },
        },
        { new: true }
      );

      console.log("Updated Customer details", updatedCustomer);
      console.log("Updated Worker details", updatedWorker);

      return res.status(200).json({
        success: true,
        message: "Successfully added",
      });
    }

    return res.status(400).json({
      success: true,
      message: "Service man already joined with you",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Service man  didn't connect to the you",
    });
  }
};

exports.disconnectUser = async (req, res) => {
  try {
    const customer_id = req.user.id;
    console.log("customer id is ", customer_id);

    // how to access workerId
    const { workerId } = req.body;

    if (customer_id == workerId) {
      return res.status(400).json({
        success: false,
        message: "You cannot add or remove yourself",
      });
    }

    const customer = await User.findById(customer_id);
    const isWorkerConnected = customer.connectedWorkers.includes(workerId);

    if (!isWorkerConnected) {
      return res.status(400).json({
        success: false,
        message: "This worker doesn't exist in your account",
      });
    } else {
      const updatedCustomer = await User.findByIdAndUpdate(
        { _id: customer_id },
        {
          $pull: { connectedWorkers: workerId },
        },
        { new: true }
      );

      const updatedWorker = await User.findByIdAndUpdate(
        { _id: workerId },
        {
          $pull: { connectedWorkers: customer_id },
        },
        { new: true }
      );

      console.log("Updated Customer", updatedCustomer);
      console.log("Updated Worker", updatedWorker);
      return res.status(200).json({
        success: true,
        message: "Worker have been successfully removed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "unable to disconnect ! Please try again later",
    });
  }
};

// doubt that this search controller will exist or not  either it will be in frontend or backend
exports.search = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Search not possible currently",
    });
  }
};

// dashboard connect

exports.dashboardConnect = async (req, res) => {
  try {
    const U_id = req.user.id;
    console.log("what is th U_id mera", U_id);

    const { address, id, contactNo } = req.body;

    if (!address || !contactNo) {
      return res.status(402).json({
        success: false,
        message:
          "Please enter your address and contact its a mandatory field for contacting you",
      });
    }

    const findUser = await User.findById(U_id);
    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: `User with id ${U_id} not found`,
      });
    }

    const requestCreation = await DashboardConnect.create({
      _id: id,
      requestedId: U_id,
      username: findUser.username,
      address,
      contactNo: contactNo,
    });

    console.log("what is requst creation", requestCreation);

    return res.status(200).json({
      success: true,
      message: "Finally your request created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to send your connect right now",
    });
  }
};
