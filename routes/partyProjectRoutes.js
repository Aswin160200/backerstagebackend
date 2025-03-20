const express = require("express");
const {
    getPartysProjects,
    getPartysProjectById,
    getPartysProjectsByProjectId,
    getPartysProjectsByInvestorId,
    getPartysProjectsByProducerId,
    getPartysProjectsByCoProducerId,
    createPartysProject,
    updatePartysProject,
    deletePartysProject,
} = require("../controllers/partysProjectController");

const router = express.Router();

router.get("/", getPartysProjects);
router.get("/:partysprojectid", getPartysProjectById);
router.get("/project/:projectid", getPartysProjectsByProjectId);
router.get("/investor/:investorid", getPartysProjectsByInvestorId); 
router.get("/producer/:producersid", getPartysProjectsByProducerId);
router.get("/coproducer/:co_producersid", getPartysProjectsByCoProducerId);
router.post("/", createPartysProject);
router.put("/:partysprojectid", updatePartysProject);
router.delete("/:partysprojectid", deletePartysProject);

module.exports = router;
