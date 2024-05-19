// cart.js

const express = require("express");
const cartController = require("../controllers/cart.js");
const auth = require("../auth.js");
const { verify, verifyAdmin } = auth;

const router = express.Router();

// Routes for cart

// Retrieve an authenticated user's pending order
router.get("/get-cart", verify, cartController.getUserCart);

// Add a product to the cart
router.post("/add-to-cart", verify, cartController.addToCart);

// Update the cart
router.put("/update-cart-quantity", verify, cartController.updateCart);

// Remove from cart
router.patch("/:productId/remove-from-cart", verify, cartController.removeFromCart);

// Clear cart
router.patch("/clear-cart", verify, cartController.clearCart);

// Search for products by name
router.post("/products/searchByName", cartController.searchProductsByName);

// Search for products by price
router.post("/products/searchByPrice", cartController.searchProductsByPrice);

module.exports = router;
