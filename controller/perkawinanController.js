const {
  Perkawinan,
  IndukKambing,
  PejantanKambing,
  Goat,
} = require("../models");

exports.createPerkawinan = async (req, res) => {
  try {
    const kawin = await Perkawinan.create(req.body);
    res.status(201).json(kawin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPerkawinan = async (req, res) => {
  try {
    const kawin = await Perkawinan.findAll({
      include: [
        { model: IndukKambing, as: "kawinBetina" },
        { model: PejantanKambing, as: "kawinJantan" },
        { model: Goat, as: "kawinKambing" },
      ],
    });
    res.json(kawin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPerkawinanById = async (req, res) => {
  try {
    const kawin = await Perkawinan.findByPk(req.params.id, {
      include: [
        { model: IndukKambing, as: "kawinBetina" },
        { model: PejantanKambing, as: "indukJantan" },
        { model: Goat, as: "kambing" },
      ],
    });

    if (!kawin) return res.status(404).json({ error: "Perkawinan not found" });

    res.json(kawin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a goat by ID
exports.updatePerkawinan = async (req, res) => {
  try {
    const kawin = await Perkawinan.findByPk(req.params.id);
    if (!kawin) return res.status(404).json({ error: "Perkawinan not found" });
    await kawin.update(req.body);
    res.json(kawin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a goat by ID
exports.deletePerkawinan = async (req, res) => {
  try {
    const goat = await Perkawinan.findByPk(req.params.id);
    if (!goat) return res.status(404).json({ error: "Perkawinan not found" });
    await goat.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
