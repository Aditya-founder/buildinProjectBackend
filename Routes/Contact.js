const express = require("express");
const router = express.Router();

const { contactUsControllers } = require("../controllers/contactUs");
const {
  auth,
  isThekedaarOrWorker,
  isAdmin,
  isEngineer,
  isCompany,
  isManagingBoy,
} = require("../middlewares/auth");

const { login } = require("../controllers/Auth");

const {
  fillWorkers_ThekedaarDetails,
  fillEngineerDetails,
  fillCompanydetails,
  fillCompanyBlogDetails,
  updateEngineerDetails,
  updateCompanyDetails,
  updateThekedaar_WorkerDetails,
  checkUserWrtId,
} = require("../controllers/controls");

const { enterMangingBoyDetail } = require("../controllers/managingBoy");

router.post("/contact", contactUsControllers);
router.post("/thekedaarRouter", auth, fillWorkers_ThekedaarDetails);

///////////////////////////////////////////
router.post("/adminRouter", auth, isAdmin);
///////////////////////////////////////////

router.post("/engineerRouter", auth, fillEngineerDetails);

router.post("/companyRouter", auth, fillCompanydetails);

router.post("/managingboy", auth, enterMangingBoyDetail);

router.post("/fill-company-blog-details", auth, fillCompanyBlogDetails);

router.post("/updateWorkerDetails", auth, updateThekedaar_WorkerDetails);
router.post("/updateEngineerDetails", auth, updateEngineerDetails);
router.post("/updateCompanyDetails", auth, updateCompanyDetails);

router.get("/check-user-wrt-id", checkUserWrtId);

module.exports = router;
