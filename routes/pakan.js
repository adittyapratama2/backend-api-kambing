const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const {
  createPakanKandang,
  getPakanKandang,
} = require("../controller/pakanController");

router.use(authenticate);

router.post("/", createPakanKandang);
router.get("/", getPakanKandang);

module.exports = router;
