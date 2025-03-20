const Investor = require("../models/investorModel");

const getInvestors = async (req, res) => {
  try {
    const investors = await Investor.getAll();
    res.status(200).json({ success: true, status: 200, data: investors });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getInvestorById = async (req, res) => {
  try {
    const investor = await Investor.getById(req.params.investorid);
    res.status(200).json({ success: true, status: 200, data: investor });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getInvestorsByProducerId = async (req, res) => {
  try {
    const investors = await Investor.getByProducerId(req.params.producersid);
    res.status(200).json({ success: true, status: 200, data: investors });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const createInvestor = async (req, res) => {
  try {
    const investor = await Investor.create(req.body);
    res.status(201).json({ success: true, status: 201, message: "Investor created successfully", data: investor });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const updateInvestor = async (req, res) => {
  try {
    const investor = await Investor.update(req.params.investorid, req.body);
    res.status(200).json({ success: true, status: 200, message: "Investor updated successfully", data: investor });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const deleteInvestor = async (req, res) => {
  try {
    await Investor.delete(req.params.investorid);
    res.status(200).json({ success: true, status: 200, message: "Investor deleted successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

module.exports = { getInvestors, getInvestorById, getInvestorsByProducerId, createInvestor, updateInvestor, deleteInvestor };
