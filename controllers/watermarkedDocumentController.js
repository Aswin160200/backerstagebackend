const WatermarkedDocument = require("../models/watermarkedDocumentModel");

const getWatermarkedDocuments = async (req, res) => {
  try {
    const documents = await WatermarkedDocument.getAll();
    res.status(200).json({ success: true, status: 200, data: documents });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getWatermarkedDocumentById = async (req, res) => {
  try {
    const document = await WatermarkedDocument.getById(req.params.watermarkeddocumentid);
    if (!document) {
      return res.status(404).json({ success: false, status: 404, message: "Watermarked document not found" });
    }
    res.status(200).json({ success: true, status: 200, data: document });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getWatermarkedDocumentsByProjectId = async (req, res) => {
  try {
    const documents = await WatermarkedDocument.getByProjectId(req.params.projectid);
    res.status(200).json({ success: true, status: 200, data: documents });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getWatermarkedDocumentsByProducerId = async (req, res) => {
  try {
    const documents = await WatermarkedDocument.getByProducerId(req.params.producersid);
    res.status(200).json({ success: true, status: 200, data: documents });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getWatermarkedDocumentsByInvestorId = async (req, res) => {
  try {
    const documents = await WatermarkedDocument.getByInvestorId(req.params.investorid);
    res.status(200).json({ success: true, status: 200, data: documents });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const createWatermarkedDocument = async (req, res) => {
  try {
    const document = await WatermarkedDocument.create(req.body);
    res.status(201).json({ success: true, status: 201, message: "Watermarked document created successfully", data: document });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const updateWatermarkedDocument = async (req, res) => {
  try {
    const document = await WatermarkedDocument.update(req.params.watermarkeddocumentid, req.body);
    if (!document) {
      return res.status(404).json({ success: false, status: 404, message: "Watermarked document not found" });
    }
    res.status(200).json({ success: true, status: 200, message: "Watermarked document updated successfully", data: document });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const deleteWatermarkedDocument = async (req, res) => {
  try {
    const deleted = await WatermarkedDocument.delete(req.params.watermarkeddocumentid);
    if (!deleted) {
      return res.status(404).json({ success: false, status: 404, message: "Watermarked document not found" });
    }
    res.status(200).json({ success: true, status: 200, message: "Watermarked document deleted successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getWatermarkedDocumentsByFilters = async (req, res) => {
  try {
    const { projectid, investorid, producersid } = req.query;
    const documents = await WatermarkedDocument.getByFilters(projectid, investorid, producersid);
    res.status(200).json({ success: true, status: 200, data: documents });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

module.exports = {
  getWatermarkedDocuments,
  getWatermarkedDocumentById,
  getWatermarkedDocumentsByProjectId,
  getWatermarkedDocumentsByProducerId,
  getWatermarkedDocumentsByInvestorId,
  createWatermarkedDocument,
  updateWatermarkedDocument,
  deleteWatermarkedDocument,
  getWatermarkedDocumentsByFilters,
};
