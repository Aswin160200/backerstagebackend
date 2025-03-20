const pool = require("../config/db");

const getSubscriptions = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM subscriptions");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving subscriptions", error: error.message });
  }
};

const getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM subscriptions WHERE subscriptionid = $1", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving subscription", error: error.message });
  }
};

const createSubscription = async (req, res) => {
  try {
    const { producersid, producersname, subscriptionplan, fromdate, todate, paymentmethod, status, amountpaid, dateofamountpaid } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO subscriptions 
        (producersid, producersname, subscriptionplan, fromdate, todate, paymentmethod, status, amountpaid, dateofamountpaid, createddate, updateddate) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) 
      RETURNING *`,
      [producersid, producersname, subscriptionplan, fromdate, todate, paymentmethod, status, amountpaid, dateofamountpaid]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error creating subscription", error: error.message });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { producersid, producersname, subscriptionplan, fromdate, todate, paymentmethod, status, amountpaid, dateofamountpaid } = req.body;

    const { rows } = await pool.query(
      `UPDATE subscriptions 
       SET producersid = $1, producersname = $2, subscriptionplan = $3, fromdate = $4, todate = $5, 
           paymentmethod = $6, status = $7, amountpaid = $8, dateofamountpaid = $9, updateddate = NOW() 
       WHERE subscriptionid = $10 
       RETURNING *`,
      [producersid, producersname, subscriptionplan, fromdate, todate, paymentmethod, status, amountpaid, dateofamountpaid, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error updating subscription", error: error.message });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query("DELETE FROM subscriptions WHERE subscriptionid = $1 RETURNING *", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.json({ message: "Subscription deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subscription", error: error.message });
  }
};

module.exports = { getSubscriptions, getSubscriptionById, createSubscription, updateSubscription, deleteSubscription };
