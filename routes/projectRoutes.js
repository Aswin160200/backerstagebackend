const express = require("express");
const {
  getProjects,
  getProjectById,
  getProjectsByProducerId,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectConroller");

const router = express.Router();

router.get("/", getProjects);

router.get("/:projectid", getProjectById);

router.get("/producer/:producersid", getProjectsByProducerId);

router.post("/", createProject);

router.put("/:projectid", updateProject);

router.delete("/:projectid", deleteProject);

module.exports = router;
