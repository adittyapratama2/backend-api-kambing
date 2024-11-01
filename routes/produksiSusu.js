const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const {
  createProduksiSusu,
  getProduksiSusu,
} = require("../controller/produksiSusuController");

router.use(authenticate);

router.post("/", createProduksiSusu);
router.get("/", getProduksiSusu);

module.exports = router;
