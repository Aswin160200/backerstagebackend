const ProjectCost = require("../models/projectsCostModel");

const getProjectCosts = async (req, res) => {
  try {
    const projectCosts = await ProjectCost.getAll();
    res.status(200).json({ success: true, status: 200, data: projectCosts });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getProjectCostById = async (req, res) => {
  try {
    const projectCost = await ProjectCost.getById(req.params.projectcostid);
    res.status(200).json({ success: true, status: 200, data: projectCost });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getProjectCostsByProjectId = async (req, res) => {
  try {
    const projectCosts = await ProjectCost.getByProjectId(req.params.projectid);
    res.status(200).json({ success: true, status: 200, data: projectCosts });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getProjectCostsByProducerId = async (req, res) => {
  try {
    const projectCosts = await ProjectCost.getByProducerId(req.params.producersid);
    res.status(200).json({ success: true, status: 200, data: projectCosts });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const createProjectCost = async (req, res) => {
  try {
    const projectCost = await ProjectCost.create(req.body);
    res.status(201).json({ success: true, status: 201, message: "Project cost created successfully", data: projectCost });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const updateProjectCost = async (req, res) => {
  try {
    const projectCost = await ProjectCost.update(req.params.projectcostid, req.body);
    res.status(200).json({ success: true, status: 200, message: "Project cost updated successfully", data: projectCost });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const deleteProjectCost = async (req, res) => {
  try {
    await ProjectCost.delete(req.params.projectcostid);
    res.status(200).json({ success: true, status: 200, message: "Project cost deleted successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

module.exports = {
  getProjectCosts,
  getProjectCostById,
  getProjectCostsByProjectId,
  getProjectCostsByProducerId,
  createProjectCost,
  updateProjectCost,
  deleteProjectCost
};
