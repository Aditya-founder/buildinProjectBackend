const express = require("express");
const router = express.Router();

const {
  engineer,
  servicer,
  company,
  locateEngineer,
  locateWorker,
} = require("../controllers/filter");

router.get("/filterEngineer", engineer);
router.get("/filterWorker", servicer);
router.get("/filterCompany", company);
router.get("/locateEngineer", locateEngineer);
router.get("/locateWorker/:state", locateWorker);

module.exports = router;
