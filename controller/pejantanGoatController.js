const { PejantanKambing } = require("../models");
const QRCode = require("qrcode");

// Create a new goat
exports.createPejantan = async (req, res) => {
  try {
    const goat = await PejantanKambing.create(req.body);
    res.status(201).json(goat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all goats
exports.getPejantan = async (req, res) => {
  try {
    const goats = await PejantanKambing.findAll();
    res.json(goats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single goat by ID
exports.getPejantanById = async (req, res) => {
  try {
    const goat = await PejantanKambing.findByPk(req.params.id);

    if (!goat) return res.status(404).json({ error: "Goat not found" });

    const qrCodeGoat = await QRCode.toDataURL(goat.id.toString(), {
      width: 500,
    });

    res.json({ goat, qrCode: qrCodeGoat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a goat by ID
exports.updatePejantan = async (req, res) => {
  try {
    const goat = await PejantanKambing.findByPk(req.params.id);
    if (!goat) return res.status(404).json({ error: "Goat not found" });
    await goat.update(req.body);
    res.json(goat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a goat by ID
exports.deletePejantan = async (req, res) => {
  try {
    const goat = await PejantanKambing.findByPk(req.params.id);
    if (!goat) return res.status(404).json({ error: "Goat not found" });
    await goat.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
