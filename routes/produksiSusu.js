const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const {
  createProduksiSusu,
  getProduksiSusu,
  deleteProduksiSusu,
} = require("../controller/produksiSusuController");

router.use(authenticate);

router.post("/", createProduksiSusu);
router.get("/", getProduksiSusu);
router.delete("/:id", deleteProduksiSusu);

module.exports = router;
