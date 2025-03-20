const express = require("express");
const {
  getCoproducers,
  getCoproducerById,
  getCoproducersByProjectId,
  getCoproducersByInvestorId,
  getCoproducersByProducerId,
  createCoproducer,
  updateCoproducer,
  deleteCoproducer
} = require("../controllers/coProducersController");

const router = express.Router();

router.get("/", getCoproducers);
router.get("/:co_producersid", getCoproducerById);
router.get("/project/:projectid", getCoproducersByProjectId);
router.get("/investor/:investorid", getCoproducersByInvestorId);
router.get("/producer/:producersid", getCoproducersByProducerId);
router.post("/", createCoproducer);
router.put("/:co_producersid", updateCoproducer);
router.delete("/:co_producersid", deleteCoproducer);

module.exports = router;
