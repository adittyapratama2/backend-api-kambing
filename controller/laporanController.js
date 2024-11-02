const { Op, where } = require("sequelize");
const {
  Goat,
  IndukKambing,
  PejantanKambing,
  Kandang,
  PertumbuhanKambing,
  PemerahanKambing,
  ProduksiSusu,
  KesehatanKambing,
  PakanKambing,
} = require("../models");

exports.getDashboardLaporan = async (req, res) => {
  try {
    // Get the limit and offset from query parameters, with default values
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    // Count the number of entries for each model
    const goatCount = await Goat.count();
    const indukKambingCount = await IndukKambing.count();
    const pejantanKambingCount = await PejantanKambing.count();
    const kandangCount = await Kandang.count();

    // Retrieve detailed information for each model, with limit and offset for pagination
    const goatDetails = await Goat.findAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    const indukKambingDetails = await IndukKambing.findAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    const pejantanKambingDetails = await PejantanKambing.findAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    const kandangDetails = await Kandang.findAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    // Construct the report data
    const report = {
      counts: {
        goats: goatCount,
        indukKambing: indukKambingCount,
        pejantanKambing: pejantanKambingCount,
        kandang: kandangCount,
      },
      details: {
        goats: goatDetails,
        indukKambing: indukKambingDetails,
        pejantanKambing: pejantanKambingDetails,
        kandang: kandangDetails,
      },
    };

    // Send the report data as the response
    res.status(200).json(report);
  } catch (error) {
    console.error("Error generating dashboard report:", error);
    res
      .status(500)
      .json({ message: "Error generating dashboard report", error });
  }
};

exports.getSearchKambingQuery = async (req, res) => {
  try {
    const { keyword } = req.query;

    // Build the search criteria with OR condition for nama_kambing and noTag
    const goatSearchCriteria = {
      where: {},
    };

    const betinaSearchCriteria = {
      where: {},
    };

    const pejantanSearchCriteria = {
      where: {},
    };

    const kandangSearchCriteria = {
      where: {},
    };

    if (keyword) {
      goatSearchCriteria.where = {
        [Op.or]: [
          { nama_kambing: { [Op.like]: `%${keyword}%` } },
          { noTag: { [Op.like]: `%${keyword}%` } },
        ],
      };

      pejantanSearchCriteria.where = {
        [Op.or]: [
          { nama_kambing: { [Op.like]: `%${keyword}%` } },
          { noTag: { [Op.like]: `%${keyword}%` } },
        ],
      };

      betinaSearchCriteria.where = {
        [Op.or]: [
          { nama_kambing: { [Op.like]: `%${keyword}%` } },
          { noTag: { [Op.like]: `%${keyword}%` } },
        ],
      };

      kandangSearchCriteria.where = {
        [Op.or]: [
          { nama_kandang: { [Op.like]: `%${keyword}%` } },
          { lokasi: { [Op.like]: `%${keyword}%` } },
        ],
      };
    }
    // Fetch the data based on the search criteria
    const [goats, kandang, induk_betina, induk_pejantan] = await Promise.all([
      Goat.findAll(goatSearchCriteria),
      Kandang.findAll(kandangSearchCriteria),
      IndukKambing.findAll(betinaSearchCriteria),
      PejantanKambing.findAll(pejantanSearchCriteria),
    ]);

    // Return the found data
    res.status(200).json({ goats, kandang, induk_betina, induk_pejantan });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving data" });
  }
};

exports.getLaporanKambingById = async (req, res) => {
  try {
    const id = req.params.id;

    const { start, end } = req.query;

    const kambingId = await Goat.findOne({
      where: {
        id: id,
      },
    });

    const pertumbuhanKambing = await PertumbuhanKambing.findAll({
      where: {
        id_kambing: id,
        tanggal_pencatatan: { [Op.between]: [start, end] },
      },
    });

    const pertumbuhanData = pertumbuhanKambing.map((entry) => ({
      date: entry.tanggal_pencatatan,
      berat: entry.berat_badan,
      tinggi: entry.tinggi_badan,
      lingkar: entry.lingkar_dada,
      kondisi: entry.kondisi_fisik,
      catatan: entry.catatan,
    }));

    const pemerahanKambing = await PemerahanKambing.findAll({
      where: {
        id_kambing: id,
        tanggal_perah: { [Op.between]: [start, end] },
      },
    });

    const pemerahanData = pemerahanKambing.map((entry) => ({
      date: entry.tanggal_perah,
      volume: entry.volume_susu,
      kualitas: entry.kualitas_susu,
      catatan: entry.catatan_perah,
    }));

    const produksiSusuKambing = await ProduksiSusu.findAll({
      where: {
        id_kambing: id,
        tanggal_produksi: { [Op.between]: [start, end] },
      },
    });

    const prodSusuData = produksiSusuKambing.map((entry) => ({
      date: entry.tanggal_produksi,
      volume: entry.volume_susu,
      kualitas: entry.kualitas_susu,
      laktasi: entry.periode_laktasi,
      catatan: entry.catatan_perah,
    }));

    const kesehatanKambing = await KesehatanKambing.findAll({
      where: {
        id_kambing: id,
        tanggal_periksa: { [Op.between]: [start, end] },
      },
    });

    const kesehatanData = kesehatanKambing.map((entry) => ({
      date: entry.tanggal_periksa,
      diagnosa: entry.diagnosa,
      pengobatan: entry.pengobatan,
      vaksinasi: entry.vaksinasi,
    }));

    res.status(200).json({
      data: kambingId,
      tumbuh: pertumbuhanData,
      perah: pemerahanData,
      kesehatan: kesehatanData,
      susu: prodSusuData,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving data" });
  }
};

exports.getLaporanKandangById = async (req, res) => {
  try {
    const id = req.params.id;

    const { start, end } = req.query;

    const kandangId = await Kandang.findOne({
      where: {
        id: id,
      },
    });

    const kandangKambing = await PakanKambing.findAll({
      where: {
        id_kandang: id,
        tgl_transaksi: { [Op.between]: [start, end] },
      },
    });

    const pakanData = kandangKambing.map((entry) => ({
      date: entry.tgl_transaksi,
      qtyPakan: entry.qty_pakan,
      catatan: entry.catatan,
    }));

    res.status(200).json({
      data: kandangId,
      pakan: pakanData,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving data" });
  }
};
