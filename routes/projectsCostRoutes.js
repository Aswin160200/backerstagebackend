const express = require("express");
const {
  getProjectCosts,
  getProjectCostById,
  getProjectCostsByProjectId,
  getProjectCostsByProducerId,
  createProjectCost,
  updateProjectCost,
  deleteProjectCost
} = require("../controllers/projectsCostController");

const router = express.Router();

router.get("/", getProjectCosts);
router.get("/:projectcostid", getProjectCostById);
router.get("/project/:projectid", getProjectCostsByProjectId);
router.get("/producer/:producersid", getProjectCostsByProducerId);
router.post("/", createProjectCost);
router.put("/:projectcostid", updateProjectCost);
router.delete("/:projectcostid", deleteProjectCost);

module.exports = router;
