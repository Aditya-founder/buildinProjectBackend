const express = require("express");
const router = express.Router();

const {
  fetchEngineer,
  fetchCompanies,
  fetchworkerThekedaar,
  getAboutMessageWorkedWith,
  getSingleAboutMessageWorkedWith,
  onlyPainter,
  onlyPlumbers,
  onlyMarbleWorkers,
  onlyElectricians,
  onlyInteriorDesigners,
  onlyContractors,
  onlyMasonWorker,
  allCompanyBlog,
  singleCompanyBlog,
  getDashboardDataId,
  getDashboardData,
  getWorkerByid,
} = require("../controllers/Get");

router.get("/fetchEngineer", fetchEngineer);
router.get("/fetchCompanies", fetchCompanies);
router.get("/fetchworkerThekedaar", fetchworkerThekedaar);
router.get("/getAboutMessageWorkedWith", getAboutMessageWorkedWith);
router.get("/getSingleAboutMessageWorkedWith", getSingleAboutMessageWorkedWith);
router.get("/painters", onlyPainter);
router.get("/plumbers", onlyPlumbers);
router.get("/marbleworkers", onlyMarbleWorkers);
router.get("/electricians", onlyElectricians);
router.get("/interiordesigners", onlyInteriorDesigners);
router.get("/contractors", onlyContractors);
router.get("/masonworkers", onlyMasonWorker);
router.get("/all-companies-blog", allCompanyBlog);
router.get("/single-company-blog", singleCompanyBlog);
router.get("/get-dashboard-data-by-id", getDashboardDataId);
router.get("/get-all-dashboard-data", getDashboardData);
router.get("/get-single-worker-wrt-id", getWorkerByid);

module.exports = router;
