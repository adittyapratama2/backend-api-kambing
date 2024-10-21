const { Goat, PemerahanKambing } = require("../models");

exports.createPemerahan = async (req, res) => {
  try {
    const response = await PemerahanKambing.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPemerahan = async (req, res) => {
  const { start, end } = req.query;

  try {
    // Build the query options
    const queryOptions = {
      include: [{ model: Goat, as: "perahKambing" }],
    };

    // If startDate and endDate are provided, add a where clause to filter by tanggal_pencatatan
    if (start && end) {
      queryOptions.where = {
        tanggal_pencatatan: {
          [Op.between]: [new Date(start), new Date(end)], // Using Sequelize's Op.between for range
        },
      };
    }

    const response = await PemerahanKambing.findAll(queryOptions);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
