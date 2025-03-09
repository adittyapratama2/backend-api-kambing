const { Op } = require("sequelize");
const { Goat, PertumbuhanKambing } = require("../models");
const moment = require("moment/moment");

exports.createPertumbuhan = async (req, res) => {
  try {
    const { id_kambing, tanggal_pencatatan } = req.body;

    // Format the date to only include year, month, and day
    const dateOnly = moment(tanggal_pencatatan).format("YYYY-MM-DD");

    // Check if a record already exists for the same id_kambing on the same date
    const existingRecord = await PertumbuhanKambing.findOne({
      where: {
        id_kambing: id_kambing,
        tanggal_pencatatan: {
          [Op.between]: [`${dateOnly} 00:00:00`, `${dateOnly} 23:59:59`],
        },
      },
    });

    if (existingRecord) {
      return res.status(400).json({
        message: "Kambing sudah melakukan pencatatan pada tanggal ini.",
      });
    }

    // If no record exists, create a new one
    const response = await PertumbuhanKambing.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPertumbuhan = async (req, res) => {
  const { start, end } = req.query;

  try {
    // Build the query options
    const queryOptions = {
      include: [{ model: Goat, as: "tumbuhKambing" }],
    };

    // If startDate and endDate are provided, add a where clause to filter by tanggal_pencatatan
    if (start && end) {
      queryOptions.where = {
        tanggal_pencatatan: {
          [Op.between]: [new Date(start), new Date(end)], // Using Sequelize's Op.between for range
        },
      };
    }

    const response = await PertumbuhanKambing.findAll(queryOptions);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPertumbuhanById = async (req, res) => {
  try {
    const { id } = req.params; // Retrieve the record ID from the URL parameters

    const record = await PertumbuhanKambing.findByPk(id, {
      include: [{ model: Goat, as: "tumbuhKambing" }],
    });

    if (!record) {
      return res
        .status(404)
        .json({ message: "Data pencatatan tidak ditemukan." });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePertumbuhan = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Request Body:", req.body); // Log untuk debugging

    const record = await PertumbuhanKambing.findByPk(id);

    if (!record) {
      return res
        .status(404)
        .json({ message: "Data pencatatan tidak ditemukan." });
    }

    await record.update(req.body);
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePertumbuhan = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the record's id is passed as a URL parameter

    // Find the record by its primary key
    const record = await PertumbuhanKambing.findByPk(id);
    if (!record) {
      return res
        .status(404)
        .json({ message: "Data pencatatan tidak ditemukan." });
    }

    // Delete the record
    await record.destroy();
    res.json({ message: "Data pencatatan berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
