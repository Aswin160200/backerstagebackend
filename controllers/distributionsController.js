const Distribution = require("../models/distributionsModel");

const getDistributions = async (req, res) => {
  try {
    const distributions = await Distribution.getAll();
    res.status(200).json({ success: true, status: 200, data: distributions });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getDistributionById = async (req, res) => {
  try {
    const distribution = await Distribution.getById(req.params.distributionid);
    if (!distribution) {
      return res.status(404).json({ success: false, status: 404, message: "Distribution not found" });
    }
    res.status(200).json({ success: true, status: 200, data: distribution });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getDistributionsByProjectId = async (req, res) => {
  try {
    const distributions = await Distribution.getByProjectId(req.params.projectid);
    res.status(200).json({ success: true, status: 200, data: distributions });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getDistributionsByProducerId = async (req, res) => {
  try {
    const distributions = await Distribution.getByProducerId(req.params.producersid);
    res.status(200).json({ success: true, status: 200, data: distributions });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const createDistribution = async (req, res) => {
  try {
    const distribution = await Distribution.create(req.body);
    res.status(201).json({ success: true, status: 201, message: "Distribution created successfully", data: distribution });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const updateDistribution = async (req, res) => {
  try {
    const distribution = await Distribution.update(req.params.distributionid, req.body);
    if (!distribution) {
      return res.status(404).json({ success: false, status: 404, message: "Distribution not found" });
    }
    res.status(200).json({ success: true, status: 200, message: "Distribution updated successfully", data: distribution });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const deleteDistribution = async (req, res) => {
  try {
    const deleted = await Distribution.delete(req.params.distributionid);
    if (!deleted) {
      return res.status(404).json({ success: false, status: 404, message: "Distribution not found" });
    }
    res.status(200).json({ success: true, status: 200, message: "Distribution deleted successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

module.exports = {
  getDistributions,
  getDistributionById,
  getDistributionsByProjectId,
  getDistributionsByProducerId,
  createDistribution,
  updateDistribution,
  deleteDistribution,
};
