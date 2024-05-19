const express = require("express");
const orderController = require("../controllers/order");
const auth = require("../auth");
const { verify, verifyAdmin } = auth;

const router = express.Router();

// Routes for order

// Create Order
router.post("/checkout", verify, orderController.checkOut);

// Retrieve User's Order
router.post("/my-orders", verify, orderController.RetrieveUserOrder);

// Retrieve All Orders
router.get("/all-orders", verify, verifyAdmin, orderController.getAllOrders);

module.exports = router;
