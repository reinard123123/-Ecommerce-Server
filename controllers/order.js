const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require('../models/Order');

// Create Order
module.exports.checkOut = async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName } = req.body;
        const { products } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const totalAmount = products.reduce((total, product) => {
            return total + (product.quantity * product.price);
        }, 0);

        const newOrder = new Order({
            products,
            totalAmount,
        });
        await newOrder.save();

        await Cart.findOneAndUpdate(
            { userId },
            { $set: { products: [] } },
            { new: true }
        );
        return res.status(201).json({
            message: "Order created successfully ✅",
            order: newOrder
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Retrieve User's Order
module.exports.RetrieveUserOrder = async (req, res) => {
    try {
        const userId = req.user.id

        const userOrders = await Order.find({ userId });

        if (userOrders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        return res.status(200).json({
            message: "Retrieved order(s) of user",
            orders: userOrders
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Retrieve all orders
module.exports.getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find();

        if (allOrders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        return res.status(200).json({
            message: "All orders retrieved successfully",
            orders: allOrders
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};