const express = require("express");
const {
  getDistributions,
  getDistributionById,
  getDistributionsByProjectId,
  getDistributionsByProducerId,
  createDistribution,
  updateDistribution,
  deleteDistribution
} = require("../controllers/distributionsController");

const router = express.Router();

router.get("/", getDistributions);
router.get("/:distributionid", getDistributionById);
router.get("/project/:projectid", getDistributionsByProjectId);
router.get("/producer/:producersid", getDistributionsByProducerId);
router.post("/", createDistribution);
router.put("/:distributionid", updateDistribution);
router.delete("/:distributionid", deleteDistribution);

module.exports = router;
