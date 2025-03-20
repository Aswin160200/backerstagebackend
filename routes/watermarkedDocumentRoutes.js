const express = require("express");
const {
    getWatermarkedDocuments,
    getWatermarkedDocumentById,
    getWatermarkedDocumentsByProjectId,
    getWatermarkedDocumentsByProducerId,
    getWatermarkedDocumentsByInvestorId,
    createWatermarkedDocument,
    updateWatermarkedDocument,
    deleteWatermarkedDocument,
    getWatermarkedDocumentsByFilters,
} = require("../controllers/watermarkedDocumentController");

const router = express.Router();

router.get("/", getWatermarkedDocuments);
router.get("/:watermarkeddocumentid", getWatermarkedDocumentById);
router.get("/project/:projectid", getWatermarkedDocumentsByProjectId);
router.get("/producer/:producersid", getWatermarkedDocumentsByProducerId);
router.get("/investor/:investorid", getWatermarkedDocumentsByInvestorId);
router.get("/filter", getWatermarkedDocumentsByFilters);
router.post("/", createWatermarkedDocument);
router.put("/:watermarkeddocumentid", updateWatermarkedDocument);
router.delete("/:watermarkeddocumentid", deleteWatermarkedDocument);

module.exports = router;
