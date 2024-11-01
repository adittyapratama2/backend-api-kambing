const { Op } = require("sequelize");
const { Goat, KesehatanKambing } = require("../models");
const moment = require("moment/moment");

exports.createKesehatan = async (req, res) => {
  try {
    const { id_kambing, tanggal_periksa } = req.body;

    // Format the date to only include year, month, and day
    const dateOnly = moment(tanggal_periksa).format("YYYY-MM-DD");

    // Check if a record already exists for the same id_kambing on the same date
    const existingRecord = await KesehatanKambing.findOne({
      where: {
        id_kambing: id_kambing,
        tanggal_periksa: {
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
    const response = await KesehatanKambing.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getKesehatan = async (req, res) => {
  const { start, end } = req.query;

  try {
    // Build the query options
    const queryOptions = {
      include: [{ model: Goat, as: "kesehatanKambing" }],
    };

    // If startDate and endDate are provided, add a where clause to filter by tanggal_pencatatan
    if (start && end) {
      queryOptions.where = {
        tanggal_pencatatan: {
          [Op.between]: [new Date(start), new Date(end)], // Using Sequelize's Op.between for range
        },
      };
    }

    const response = await KesehatanKambing.findAll(queryOptions);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
