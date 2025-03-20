const pool = require("../config/db");

const Project = {
  getAll: async () => {
    try {
      const { rows } = await pool.query("SELECT * FROM projects");
      return { success: true, status: 200, data: rows };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Error fetching projects",
        error: error.message,
      };
    }
  },

  getById: async (projectid) => {
    try {
      const projectIdInt = parseInt(projectid, 10);
      if (isNaN(projectIdInt)) {
        return { success: false, status: 400, message: "Invalid project ID" };
      }

      const { rows } = await pool.query("SELECT * FROM projects WHERE projectid = $1", [projectIdInt]);
      if (rows.length === 0) {
        return { success: false, status: 404, message: "Project not found" };
      }

      return { success: true, status: 200, data: rows[0] };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Error fetching project",
        error: error.message,
      };
    }
  },

  getByProducerId: async (producersid) => {
    try {
      const producerIdInt = parseInt(producersid, 10);
      if (isNaN(producerIdInt)) {
        return { success: false, status: 400, message: "Invalid producer ID" };
      }

      const { rows } = await pool.query("SELECT * FROM projects WHERE producersid = $1", [producerIdInt]);
      return { success: true, status: 200, data: rows };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Error fetching projects by producer ID",
        error: error.message,
      };
    }
  },

  create: async (projectData) => {
    try {
      const {
        producersid, projectname, projectsummary, status, startdate, deadline,
        uploadeddocument, billedname, totalcapitalization, totalallocation,
        totalraised, houseticketlink, houseticketcomments, generalcomments
      } = projectData;

      if (!projectname || !status) {
        return { success: false, status: 400, message: "Project name and status are required" };
      }

      const { rows } = await pool.query(
        `INSERT INTO projects 
          (producersid, projectname, projectsummary, status, startdate, deadline, 
          uploadeddocument, billedname, totalcapitalization, totalallocation, 
          totalraised, houseticketlink, houseticketcomments, generalcomments, 
          createddate, updateddate) 
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW()) 
        RETURNING *`,
        [
          producersid, projectname, projectsummary, status, startdate, deadline,
          uploadeddocument, billedname, totalcapitalization, totalallocation,
          totalraised, houseticketlink, houseticketcomments, generalcomments
        ]
      );

      return { success: true, status: 201, message: "Project created successfully", data: rows[0] };
    } catch (error) {
      return { success: false, status: 500, message: "Error creating project", error: error.message };
    }
  },

  update: async (projectid, projectData) => {
    try {
      const projectIdInt = parseInt(projectid, 10);
      if (isNaN(projectIdInt)) {
        return { success: false, status: 400, message: "Invalid project ID" };
      }

      const {
        producersid, projectname, projectsummary, status, startdate, deadline,
        uploadeddocument, billedname, totalcapitalization, totalallocation,
        totalraised, houseticketlink, houseticketcomments, generalcomments
      } = projectData;

      const { rows } = await pool.query(
        `UPDATE projects 
        SET 
          producersid = $1, projectname = $2, projectsummary = $3, status = $4, 
          startdate = $5, deadline = $6, uploadeddocument = $7, billedname = $8, 
          totalcapitalization = $9, totalallocation = $10, totalraised = $11, 
          houseticketlink = $12, houseticketcomments = $13, generalcomments = $14, 
          updateddate = NOW() 
        WHERE projectid = $15 
        RETURNING *`,
        [
          producersid, projectname, projectsummary, status, startdate, deadline,
          uploadeddocument, billedname, totalcapitalization, totalallocation,
          totalraised, houseticketlink, houseticketcomments, generalcomments,
          projectIdInt
        ]
      );

      if (rows.length === 0) {
        return { success: false, status: 404, message: "Project not found" };
      }

      return { success: true, status: 200, message: "Project updated successfully", data: rows[0] };
    } catch (error) {
      return { success: false, status: 500, message: "Error updating project", error: error.message };
    }
  },

  delete: async (projectid) => {
    try {
      const projectIdInt = parseInt(projectid, 10);
      if (isNaN(projectIdInt)) {
        return { success: false, status: 400, message: "Invalid project ID" };
      }

      const { rows } = await pool.query("DELETE FROM projects WHERE projectid = $1 RETURNING *", [projectIdInt]);
      if (rows.length === 0) {
        return { success: false, status: 404, message: "Project not found" };
      }
      return { success: true, status: 200, message: "Project deleted successfully", data: rows[0] };
    } catch (error) {
      return { success: false, status: 500, message: "Error deleting project", error: error.message };
    }
  },
};

module.exports = Project;
