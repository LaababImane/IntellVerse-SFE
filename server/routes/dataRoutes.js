const express = require("express");
const router = express.Router();
const dataController = require("../controller/data")

router.post("/dashboard-data", dataController.getAllData);

module.exports = router;