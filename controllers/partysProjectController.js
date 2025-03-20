const PartysProject = require("../models/partysProjectModel");

const getPartysProjects = async (req, res) => {
  try {
    const projects = await PartysProject.getAll();
    res.status(200).json({ success: true, status: 200, data: projects });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getPartysProjectById = async (req, res) => {
  try {
    const project = await PartysProject.getById(req.params.partysprojectid);
    res.status(200).json({ success: true, status: 200, data: project });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getPartysProjectsByProjectId = async (req, res) => {
  try {
    const projects = await PartysProject.getByProjectId(req.params.projectid);
    res.status(200).json({ success: true, status: 200, data: projects });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getPartysProjectsByInvestorId = async (req, res) => {
  try {
    const projects = await PartysProject.getByInvestorId(req.params.investorid);
    res.status(200).json({ success: true, status: 200, data: projects });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getPartysProjectsByProducerId = async (req, res) => {
  try {
    const projects = await PartysProject.getByProducerId(req.params.producersid);
    res.status(200).json({ success: true, status: 200, data: projects });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getPartysProjectsByCoProducerId = async (req, res) => {
  try {
    const projects = await PartysProject.getByCoProducerId(req.params.co_producersid);
    res.status(200).json({ success: true, status: 200, data: projects });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const createPartysProject = async (req, res) => {
    try {
      const newProject = await PartysProject.create(req.body);
      res.status(201).json({
        success: true,
        status: 201,
        message: "Partys project created successfully",
        data: newProject,
      });
    } catch (error) {
      console.error("Error creating partys project:", error); // Log error for debugging
      res.status(error.status || 500).json({
        success: false,
        status: error.status || 500,
        message: "Error creating partys project",
        error: error.message,
      });
    }
  };

const updatePartysProject = async (req, res) => {
  try {
    const project = await PartysProject.update(req.params.partysprojectid, req.body);
    res.status(200).json({ success: true, status: 200, message: "Project updated successfully", data: project });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const deletePartysProject = async (req, res) => {
  try {
    await PartysProject.delete(req.params.partysprojectid);
    res.status(200).json({ success: true, status: 200, message: "Project deleted successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

module.exports = {
  getPartysProjects,
  getPartysProjectById,
  getPartysProjectsByProjectId,
  getPartysProjectsByInvestorId,
  getPartysProjectsByProducerId,
  getPartysProjectsByCoProducerId,
  createPartysProject,
  updatePartysProject,
  deletePartysProject,
};