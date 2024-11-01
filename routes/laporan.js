const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const {
  getDashboardLaporan,
  getSearchKambingQuery,
  getLaporanKambingById,
} = require("../controller/laporanController");

router.use(authenticate);

router.get("/all", getDashboardLaporan);
router.get("/search", getSearchKambingQuery);
router.get("/detail/:id", getLaporanKambingById);

module.exports = router;
