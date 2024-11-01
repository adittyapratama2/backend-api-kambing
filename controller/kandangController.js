const { Kandang } = require("../models");
const QRCode = require("qrcode");

// Create a new goat
exports.createKandang = async (req, res) => {
  try {
    const kandang = await Kandang.create(req.body);
    res.status(201).json(kandang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all goats
exports.getKandang = async (req, res) => {
  try {
    const kandang = await Kandang.findAll();
    res.json(kandang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single goat by ID
exports.getKandangById = async (req, res) => {
  try {
    const kandang = await Kandang.findByPk(req.params.id);

    if (!kandang) return res.status(404).json({ error: "Kandang not found" });

    const qrCodeData = JSON.stringify({
      id: kandang.id,
      jenis: "kandang",
    });

    const qrCode = await QRCode.toDataURL(qrCodeData.toString(), {
      width: 500,
    });

    res.json({ kandang, qrCode: qrCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a goat by ID
exports.updateKandang = async (req, res) => {
  try {
    const kandang = await Kandang.findByPk(req.params.id);
    if (!kandang) return res.status(404).json({ error: "Kandang not found" });
    await kandang.update(req.body);
    res.json(kandang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a goat by ID
exports.deleteKandang = async (req, res) => {
  try {
    const kandang = await Kandang.findByPk(req.params.id);
    if (!kandang) return res.status(404).json({ error: "Kandang not found" });
    await kandang.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
