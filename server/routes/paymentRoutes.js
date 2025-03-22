const express = require("express");
const router = express.Router();
const PaymentController = require("../controller/payment");

router.post("/get-token", PaymentController.ganerateToken);
router.post("/payment", PaymentController.paymentProcess);

module.exports = router;