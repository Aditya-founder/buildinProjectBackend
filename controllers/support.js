const Worker = require("../models/workerProfile");

exports.chatSupport = async (req, res) => {
  try {
  } catch (error) {}
};

exports.callSupport = async (req, res) => {
  try {
  } catch (error) {}
};

exports.checkAvailability = async (req, res) => {
  try {
    // fetching worker id
    const { worker_id } = req.user.id;

    if (!worker_id) {
      return res.status(400).json({
        success: false,
        message: "Worker id successfully not fetched",
      });
    }

    if (worker_id.connectedWorkers.length === 0) {
      return res.json({
        success: true,
        message: "Worker is available at this time",
      });
    } else {
      return res.json({
        success: false,
        message: "Worker is currenty unavailable",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to check availability currently",
    });
  }
};
