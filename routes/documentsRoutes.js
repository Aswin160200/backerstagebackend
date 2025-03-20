const express = require("express");
const {
  getDocuments,
  getDocumentById,
  getDocumentsByProjectId,
  getDocumentsByProducerId,
  getDocumentsByInvestorId,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocumentsByFilters,
} = require("../controllers/documentsController");

const router = express.Router();

router.get("/", getDocuments);
router.get("/:documentid", getDocumentById);
router.get("/project/:projectid", getDocumentsByProjectId);
router.get("/producer/:producersid", getDocumentsByProducerId);
router.get("/investor/:investorid", getDocumentsByInvestorId);
router.get("/filter", getDocumentsByFilters);
router.post("/", createDocument);
router.put("/:documentid", updateDocument);
router.delete("/:documentid", deleteDocument);

module.exports = router;
