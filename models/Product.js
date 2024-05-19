const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity is required"],
  },
  imageUrl: {
    type: String,
  },
});

// Create and export the Product model
module.exports = mongoose.model("Product", productSchema);
