const express = require("express");
const {
  getNotes,
  getNoteById,
  getNotesByProjectId,
  getNotesByProducerId,
  getNotesByInvestorId,
  getNotesByCoProducerId,
  createNote,
  updateNote,
  deleteNote
} = require("../controllers/notesController");

const router = express.Router();


router.get("/", getNotes);
router.get("/:noteid", getNoteById);
router.get("/project/:projectid", getNotesByProjectId);
router.get("/producer/:producersid", getNotesByProducerId);
router.get("/investor/:investorid", getNotesByInvestorId);
router.get("/coproducer/:co_producersid", getNotesByCoProducerId);
router.post("/", createNote);
router.put("/:noteid", updateNote);
router.delete("/:noteid", deleteNote);

module.exports = router;
