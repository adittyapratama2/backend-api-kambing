const {
  Care,
  KesehatanKambing,
  PertumbuhanKambing,
  PemerahanKambing,
  ProduksiSusu,
  PakanKambing,
} = require("../models");

// Create a new care record
exports.createCare = async (req, res) => {
  try {
    const care = await Care.create(req.body);
    res.status(201).json(care);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all care records
exports.getCares = async (req, res) => {
  const { limit, offset } = req.query; // Default limit and offset values

  try {
    const pertumbuhan = await PertumbuhanKambing.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]], // Fetch newest data first
    });

    const pemerahan = await PemerahanKambing.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]], // Fetch newest data first
    });

    const produksi_susu = await ProduksiSusu.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]], // Fetch newest data first
    });

    const pakan_kandang = await PakanKambing.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]], // Fetch newest data first
    });

    const kesehatan = await KesehatanKambing.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]], // Fetch newest data first
    });

    res.json({
      pertumbuhan: {
        data: pertumbuhan.rows,
        total: pertumbuhan.count,
        limit: parseInt(limit),
        offset: parseInt(offset),
      },
      pemerahan: {
        data: pemerahan.rows,
        total: pemerahan.count,
        limit: parseInt(limit),
        offset: parseInt(offset),
      },
      kesehatan: {
        data: kesehatan.rows,
        total: kesehatan.count,
        limit: parseInt(limit),
        offset: parseInt(offset),
      },
      produksi_susu: {
        data: produksi_susu.rows,
        total: produksi_susu.count,
        limit: parseInt(limit),
        offset: parseInt(offset),
      },
      pakan_kandang: {
        data: pakan_kandang.rows,
        total: pakan_kandang.count,
        limit: parseInt(limit),
        offset: parseInt(offset),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single care record by ID
exports.getCare = async (req, res) => {
  try {
    const care = await Care.findByPk(req.params.id);
    if (!care) return res.status(404).json({ error: "Care not found" });
    res.json(care);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a care record by ID
exports.updateCare = async (req, res) => {
  try {
    const care = await Care.findByPk(req.params.id);
    if (!care) return res.status(404).json({ error: "Care not found" });
    await care.update(req.body);
    res.json(care);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a care record by ID
exports.deleteCare = async (req, res) => {
  try {
    const care = await Care.findByPk(req.params.id);
    if (!care) return res.status(404).json({ error: "Care not found" });
    await care.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
