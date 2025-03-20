const pool = require("../config/db");

const ProjectCost = {
  getAll: async () => {
    try {
      const { rows } = await pool.query("SELECT * FROM projectscost");
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching project costs", error: error.message };
    }
  },

  getById: async (projectcostid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM projectscost WHERE projectcostid = $1", [projectcostid]);
      if (rows.length === 0) {
        throw { status: 404, message: "Project cost not found" };
      }
      return rows[0];
    } catch (error) {
      throw error.status ? error : { status: 500, message: "Error fetching project cost", error: error.message };
    }
  },

  getByProjectId: async (projectid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM projectscost WHERE projectid = $1", [projectid]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching project costs by project ID", error: error.message };
    }
  },

  getByProducerId: async (producersid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM projectscost WHERE producersid = $1", [producersid]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching project costs by producer ID", error: error.message };
    }
  },

  create: async (projectCostData) => {
    try {
      const {
        projectid, producersid, costdescription, totalcost, dateofcost,
        status, costincuredby, dateofreimbursement, projectname, expensecomments
      } = projectCostData;

      const { rows } = await pool.query(
        `INSERT INTO projectscost 
          (projectid, producersid, costdescription, totalcost, dateofcost, 
          status, costincuredby, dateofreimbursement, projectname, expensecomments, createddate, updateddate) 
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW()) 
        RETURNING *`,
        [projectid, producersid, costdescription, totalcost, dateofcost, status, costincuredby, dateofreimbursement, projectname, expensecomments]
      );

      return rows[0];
    } catch (error) {
      throw { status: 500, message: "Error creating project cost", error: error.message };
    }
  },

  update: async (projectcostid, projectCostData) => {
    try {
      const {
        projectid, producersid, costdescription, totalcost, dateofcost,
        status, costincuredby, dateofreimbursement, projectname, expensecomments
      } = projectCostData;

      const { rows } = await pool.query(
        `UPDATE projectscost 
        SET 
          projectid = $1, producersid = $2, costdescription = $3, totalcost = $4, dateofcost = $5,
          status = $6, costincuredby = $7, dateofreimbursement = $8, projectname = $9, expensecomments = $10,
          updateddate = NOW() 
        WHERE projectcostid = $11 
        RETURNING *`,
        [projectid, producersid, costdescription, totalcost, dateofcost, status, costincuredby, dateofreimbursement, projectname, expensecomments, projectcostid]
      );

      if (rows.length === 0) {
        throw { status: 404, message: "Project cost not found" };
      }

      return rows[0];
    } catch (error) {
      throw { status: 500, message: "Error updating project cost", error: error.message };
    }
  },

  delete: async (projectcostid) => {
    try {
      const { rows } = await pool.query("DELETE FROM projectscost WHERE projectcostid = $1 RETURNING *", [projectcostid]);
      if (rows.length === 0) {
        throw { status: 404, message: "Project cost not found" };
      }
      return rows[0];
    } catch (error) {
      throw { status: 500, message: "Error deleting project cost", error: error.message };
    }
  },
};

module.exports = ProjectCost;
