const mongoose = require("mongoose");

// Define the Order schema
const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  purchasedOn: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
    enum: ["pending", "processing", "packing", "in transit", "delivered"],
    default: "pending",
  },
});

// Create and export the Order model
module.exports = mongoose.model("Cart", cartSchema);
