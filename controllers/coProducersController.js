const Coproducer = require("../models/coProducersModel");

const getCoproducers = async (req, res) => {
  try {
    const coproducers = await Coproducer.getAll();
    res.status(200).json({ success: true, status: 200, data: coproducers });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getCoproducerById = async (req, res) => {
  try {
    const coproducer = await Coproducer.getById(req.params.co_producersid);
    res.status(200).json({ success: true, status: 200, data: coproducer });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getCoproducersByProjectId = async (req, res) => {
  try {
    const coproducers = await Coproducer.getByProjectId(req.params.projectid);
    res.status(200).json({ success: true, status: 200, data: coproducers });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getCoproducersByInvestorId = async (req, res) => {
  try {
    const coproducers = await Coproducer.getByInvestorId(req.params.investorid);
    res.status(200).json({ success: true, status: 200, data: coproducers });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const getCoproducersByProducerId = async (req, res) => {
  try {
    const coproducers = await Coproducer.getByProducerId(req.params.producersid);
    res.status(200).json({ success: true, status: 200, data: coproducers });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const createCoproducer = async (req, res) => {
  try {
    const coproducer = await Coproducer.create(req.body);
    res.status(201).json({ success: true, status: 201, message: "Coproducer created successfully", data: coproducer });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const updateCoproducer = async (req, res) => {
  try {
    const coproducer = await Coproducer.update(req.params.co_producersid, req.body);
    res.status(200).json({ success: true, status: 200, message: "Coproducer updated successfully", data: coproducer });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

const deleteCoproducer = async (req, res) => {
  try {
    await Coproducer.delete(req.params.co_producersid);
    res.status(200).json({ success: true, status: 200, message: "Coproducer deleted successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, status: error.status || 500, message: error.message });
  }
};

module.exports = {
  getCoproducers,
  getCoproducerById,
  getCoproducersByProjectId,
  getCoproducersByInvestorId,
  getCoproducersByProducerId,
  createCoproducer,
  updateCoproducer,
  deleteCoproducer,
};
