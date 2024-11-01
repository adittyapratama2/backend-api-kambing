const { Op } = require("sequelize");
const { PakanKambing, Kandang } = require("../models");

exports.createPakanKandang = async (req, res) => {
  try {
    const result = await PakanKambing.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all goats
exports.getPakanKandang = async (req, res) => {
  const { start, end } = req.query;

  try {
    // Build the query options
    const queryOptions = {
      include: [{ model: Kandang, as: "pakanKandang" }],
    };

    // If startDate and endDate are provided, add a where clause to filter by tanggal_pencatatan
    if (start && end) {
      queryOptions.where = {
        tgl_transaksi: {
          [Op.between]: [new Date(start), new Date(end)], // Using Sequelize's Op.between for range
        },
      };
    }

    const response = await PakanKambing.findAll(queryOptions);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
