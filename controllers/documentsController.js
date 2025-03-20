const Document = require("../models/documentsModel");

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.getAll();
    res.status(200).json({ success: true, status: 200, data: documents });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const document = await Document.getById(req.params.documentid);
    if (!document) {
      return res.status(404).json({ success: false, status: 404, message: "Document not found" });
    }
    res.status(200).json({ success: true, status: 200, data: document });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getDocumentsByProjectId = async (req, res) => {
  try {
    const documents = await Document.getByProjectId(req.params.projectid);
    res.status(200).json({ success: true, status: 200, data: documents });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getDocumentsByProducerId = async (req, res) => {
  try {
    const documents = await Document.getByProducerId(req.params.producersid);
    res.status(200).json({ success: true, status: 200, data: documents });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getDocumentsByInvestorId = async (req, res) => {
  try {
    const documents = await Document.getByInvestorId(req.params.investorid);
    res.status(200).json({ success: true, status: 200, data: documents });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const createDocument = async (req, res) => {
  try {
    const document = await Document.create(req.body);
    res.status(201).json({ success: true, status: 201, message: "Document created successfully", data: document });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const updateDocument = async (req, res) => {
  try {
    const document = await Document.update(req.params.documentid, req.body);
    if (!document) {
      return res.status(404).json({ success: false, status: 404, message: "Document not found" });
    }
    res.status(200).json({ success: true, status: 200, message: "Document updated successfully", data: document });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const deleted = await Document.delete(req.params.documentid);
    if (!deleted) {
      return res.status(404).json({ success: false, status: 404, message: "Document not found" });
    }
    res.status(200).json({ success: true, status: 200, message: "Document deleted successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getDocumentsByFilters = async (req, res) => {
  try {
    const { projectid, investorid, producersid } = req.query;
    const documents = await Document.getByFilters(projectid, investorid, producersid);
    res.status(200).json({ success: true, status: 200, data: documents });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

module.exports = {
  getDocuments,
  getDocumentById,
  getDocumentsByProjectId,
  getDocumentsByProducerId,
  getDocumentsByInvestorId,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocumentsByFilters,
};
