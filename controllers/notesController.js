const Note = require("../models/notesModel");

const getNotes = async (req, res) => {
  try {
    const notes = await Note.getAll();
    res.status(200).json({ success: true, status: 200, data: notes });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.getById(req.params.noteid);
    res.status(200).json({ success: true, status: 200, data: note });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getNotesByProjectId = async (req, res) => {
  try {
    const notes = await Note.getByProjectId(req.params.projectid);
    res.status(200).json({ success: true, status: 200, data: notes });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getNotesByProducerId = async (req, res) => {
  try {
    const notes = await Note.getByProducerId(req.params.producersid);
    res.status(200).json({ success: true, status: 200, data: notes });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getNotesByInvestorId = async (req, res) => {
  try {
    const notes = await Note.getByInvestorId(req.params.investorid);
    res.status(200).json({ success: true, status: 200, data: notes });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getNotesByCoProducerId = async (req, res) => {
  try {
    const notes = await Note.getByCoProducerId(req.params.co_producersid);
    res.status(200).json({ success: true, status: 200, data: notes });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json({ success: true, status: 201, message: "Note created successfully", data: note });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await Note.update(req.params.noteid, req.body);
    res.status(200).json({ success: true, status: 200, message: "Note updated successfully", data: note });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    await Note.delete(req.params.noteid);
    res.status(200).json({ success: true, status: 200, message: "Note deleted successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

module.exports = {
  getNotes,
  getNoteById,
  getNotesByProjectId,
  getNotesByProducerId,
  getNotesByInvestorId,
  getNotesByCoProducerId,
  createNote,
  updateNote,
  deleteNote,
};
