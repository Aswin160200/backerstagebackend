const pool = require("../config/db");

const Subscriptions = {
  getAll: async () => {
    try {
      const { rows } = await pool.query("SELECT * FROM subscriptions");
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error retrieving subscriptions", error: error.message };
    }
  },

  getByProducerId: async (producersid) => {
    try {
      if (!producersid || isNaN(producersid)) {
        throw { status: 400, message: "Invalid or missing producer ID" };
      }

      const { rows } = await pool.query("SELECT * FROM subscriptions WHERE producersid = $1", [producersid]);

      if (rows.length === 0) {
        throw { status: 404, message: "No subscriptions found for this producer" };
      }

      return rows;
    } catch (error) {
      throw error.status
        ? error
        : { status: 500, message: "Error retrieving subscription", error: error.message };
    }
  },

  create: async (
    producersid, producersname, subscriptionplan, fromdate, todate,
    paymentmethod, status, amountpaid, dateofamountpaid
  ) => {
    try {
      if (!producersid || isNaN(producersid)) {
        throw { status: 400, message: "Invalid or missing producer ID" };
      }

      const { rows } = await pool.query(
        `INSERT INTO subscriptions 
         (producersid, producersname, subscriptionplan, fromdate, todate, 
          paymentmethod, status, amountpaid, dateofamountpaid, createddate, updateddate) 
         VALUES 
         ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) 
         RETURNING *`,
        [producersid, producersname, subscriptionplan, fromdate, todate, 
         paymentmethod, status, amountpaid, dateofamountpaid]
      );
      return rows[0];
    } catch (error) {
      throw { status: 500, message: "Error creating subscription", error: error.message };
    }
  },

  update: async (
    subscriptionid, producersid, subscriptionplan, fromdate, todate,
    paymentmethod, status, amountpaid, dateofamountpaid
  ) => {
    try {
      if (!subscriptionid || isNaN(subscriptionid)) {
        throw { status: 400, message: "Invalid or missing subscription ID" };
      }

      const { rows } = await pool.query(
        `UPDATE subscriptions 
         SET producersid = $1, subscriptionplan = $2, fromdate = $3, todate = $4, 
             paymentmethod = $5, status = $6, amountpaid = $7, dateofamountpaid = $8, 
             updateddate = NOW()
         WHERE subscriptionid = $9 
         RETURNING *`,
        [producersid, subscriptionplan, fromdate, todate, paymentmethod, status, amountpaid, dateofamountpaid, subscriptionid]
      );

      if (rows.length === 0) {
        throw { status: 404, message: "Subscription not found" };
      }

      return rows[0];
    } catch (error) {
      throw { status: 500, message: "Error updating subscription", error: error.message };
    }
  }
};

module.exports = Subscriptions;
