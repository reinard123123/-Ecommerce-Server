//  products.js
const express = require("express");
const productController = require("../controllers/product.js");
const auth = require("../auth.js");
const { verify, verifyAdmin } = require('../auth');

const router = express.Router();

// Routes for handling products

// Create a new product (Admin Only)
router.post("/create", verify, verifyAdmin, productController.createProduct);

// Retrieve all products (Admin Only)
router.get("/all", verify, verifyAdmin, productController.getAllProducts);

// Retrieve all active products
router.get("/", productController.getAllActiveProducts);

// Retrieve a specific product
router.get("/:productId", productController.getProduct);

// Update a specific product (Admin Only)
router.put("/:productId", verify, verifyAdmin, productController.updateProduct);

// Archive a specific product (Admin Only)
router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);

// Activate a specific product (Admin Only)
router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct);

// Search for products by name
router.post("/search", productController.searchProductsByName);

// Delete a product
router.delete("/delete/:productId", verify, verifyAdmin, productController.deleteProduct);

module.exports = router;
