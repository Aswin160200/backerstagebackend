const express = require("express");
const {
  getInvestors,
  getInvestorById,
  getInvestorsByProducerId,
  createInvestor,
  updateInvestor,
  deleteInvestor
} = require("../controllers/investorContoller");

const router = express.Router();

router.get("/", getInvestors);
router.get("/:investorid", getInvestorById);
router.get("/producer/:producersid", getInvestorsByProducerId);
router.post("/", createInvestor);
router.put("/:investorid", updateInvestor);
router.delete("/:investorid", deleteInvestor);

module.exports = router;
