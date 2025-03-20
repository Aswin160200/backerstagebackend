const pool = require("../config/db");

const getProjects = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM projects");
    res.status(200).json({ success: true, status: 200, data: rows });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ success: false, status: 500, message: "Error fetching projects", error: err.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { projectid } = req.params;
    const projectIdInt = parseInt(projectid, 10);

    if (isNaN(projectIdInt)) {
      return res.status(400).json({ success: false, status: 400, message: "Invalid project ID" });
    }

    const { rows } = await pool.query("SELECT * FROM projects WHERE projectid = $1", [projectIdInt]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, status: 404, message: "Project not found" });
    }

    res.status(200).json({ success: true, status: 200, data: rows[0] });
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ success: false, status: 500, message: "Error fetching project", error: err.message });
  }
};

const getProjectsByProducerId = async (req, res) => {
  try {
    const { producersid } = req.params;
    const producerIdInt = parseInt(producersid, 10);

    if (isNaN(producerIdInt)) {
      return res.status(400).json({ success: false, status: 400, message: "Invalid producer ID" });
    }

    const { rows } = await pool.query("SELECT * FROM projects WHERE producersid = $1", [producerIdInt]);
    res.status(200).json({ success: true, status: 200, data: rows });
  } catch (err) {
    console.error("Error fetching projects by producer ID:", err);
    res.status(500).json({ success: false, status: 500, message: "Error fetching projects", error: err.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { producersid, projectname, projectsummary, status, startdate, deadline, uploadeddocument, billedname, totalcapitalization, totalallocation, totalraised, houseticketlink, houseticketcomments, generalcomments } = req.body;
    
    const { rows } = await pool.query(
      `INSERT INTO projects (producersid, projectname, projectsummary, status, startdate, deadline, uploadeddocument, billedname, totalcapitalization, totalallocation, totalraised, houseticketlink, houseticketcomments, generalcomments, createddate, updateddate) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW()) RETURNING *`,
      [producersid, projectname, projectsummary, status, startdate, deadline, uploadeddocument, billedname, totalcapitalization, totalallocation, totalraised, houseticketlink, houseticketcomments, generalcomments]
    );

    res.status(201).json({ success: true, status: 201, message: "Project created successfully", data: rows[0] });
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ success: false, status: 500, message: "Error creating project", error: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { projectid } = req.params;
    const projectIdInt = parseInt(projectid, 10);

    if (isNaN(projectIdInt)) {
      return res.status(400).json({ success: false, status: 400, message: "Invalid project ID" });
    }

    const { projectname, projectsummary, status, startdate, deadline, uploadeddocument, billedname, totalcapitalization, totalallocation, totalraised, houseticketlink, houseticketcomments, generalcomments } = req.body;

    const { rows } = await pool.query(
      `UPDATE projects SET projectname = $1, projectsummary = $2, status = $3, startdate = $4, deadline = $5, uploadeddocument = $6, billedname = $7, totalcapitalization = $8, totalallocation = $9, totalraised = $10, houseticketlink = $11, houseticketcomments = $12, generalcomments = $13, updateddate = NOW() WHERE projectid = $14 RETURNING *`,
      [projectname, projectsummary, status, startdate, deadline, uploadeddocument, billedname, totalcapitalization, totalallocation, totalraised, houseticketlink, houseticketcomments, generalcomments, projectIdInt]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, status: 404, message: "Project not found" });
    }

    res.status(200).json({ success: true, status: 200, message: "Project updated successfully", data: rows[0] });
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ success: false, status: 500, message: "Error updating project", error: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { projectid } = req.params;
    const projectIdInt = parseInt(projectid, 10);

    if (isNaN(projectIdInt)) {
      return res.status(400).json({ success: false, status: 400, message: "Invalid project ID" });
    }

    const { rowCount } = await pool.query("DELETE FROM projects WHERE projectid = $1", [projectIdInt]);

    if (rowCount === 0) {
      return res.status(404).json({ success: false, status: 404, message: "Project not found" });
    }

    res.status(200).json({ success: true, status: 200, message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ success: false, status: 500, message: "Error deleting project", error: err.message });
  }
};

module.exports = { getProjects, getProjectById, getProjectsByProducerId, createProject, updateProject, deleteProject };
