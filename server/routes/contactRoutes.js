const express = require("express");
const router = express.Router();
const contactController = require("../controller/contact")

router.post("/contact",contactController.contacter);
module.exports = router; 