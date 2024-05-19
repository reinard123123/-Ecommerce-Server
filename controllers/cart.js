const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Cart Controller

// Retrieve user's pending cart
module.exports.getUserCart = async (req, res) => {
  try{
    const userId = req.user.id;

    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.status(404).json({ error: "No cart found for this user" });
    }
    if (userCart.products.length === 0) {
      return res.status(200).json({ 
        message: "Cart is empty, add something to your cart!"
      });
    }

    res.status(200).json({ cart: "User's Cart", userCart });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add to cart
module.exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, subtotal } = req.body;
    const userId = req.user.id;

    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      userCart = new Cart({
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        products: [],
        totalAmount: 0,
      });
    }

    const existingProduct = userCart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (existingProduct !== -1) {
      userCart.products[existingProduct].quantity += quantity;
      userCart.products[existingProduct].subtotal += subtotal;
    } else {
      const productInfo = await Product.findById(productId);

      if (!productInfo) {
        return res.status(404).json({ error: "Product not found" });
      }

      userCart.products.push({
        productId: productInfo._id,
        productName: productInfo.name,
        quantity,
      });
    }

    let totalPrice = 0;

      for (let i = 0; i < userCart.products.length; i++) {
        const product = userCart.products[i];
        const productInfo = await Product.findById(product.productId);

        if (productInfo) {
          totalPrice += product.quantity * productInfo.price;
        }
      }
      userCart.totalPrice = totalPrice;

    await userCart.save();

    return res.status(200).json({
      message: "Added to cart! ✅",
      userCart,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Update cart
module.exports.updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.status(404).json({ error: "No cart found for this user" });
    }

    let existingProduct = userCart.products.find(
      (product) => product.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity = quantity;

      const productInfo = await Product.findById(productId);

      if (!productInfo) {
        return res.status(404).json({ error: "Product not found" });
      }

      existingProduct.subtotal = quantity * productInfo.price;
    } else {
      const productInfo = await Product.findById(productId);

      if (!productInfo) {
        return res.status(404).json({ error: "Product not found" });
      }

      userCart.products.push({
        productId: productInfo._id,
        productName: productInfo.name,
        quantity,
        subtotal: quantity * productInfo.price,
      });
    }

    let totalPrice = 0;
    for (let i = 0; i < userCart.products.length; i++) {
      totalPrice += userCart.products[i].subtotal;
    }
    userCart.totalPrice = totalPrice;

    await userCart.save();

    return res.status(200).json({
      message: "Cart updated successfully ✅",
      userCart,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Remove from cart
module.exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.status(404).json({ error: "No cart found for this user" });
    }
    userCart.products = userCart.products.filter(
      (product) => product.productId.toString() !== productId
    );

    let totalPrice = 0;
    for (let i = 0; i < userCart.products.length; i++) {
      totalPrice += userCart.products[i].subtotal;
    }
    userCart.totalPrice = totalPrice;

    await userCart.save();

    return res.status(200).json({
      message: "Removed from cart ✅",
      userCart,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Clear cart
module.exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let userCart = await Cart.findOne({ userId });

    if (userCart.products.length > 0) {
      userCart.products = [];
      userCart.totalPrice = 0;

      await userCart.save();

      return res.status(200).json({
        message: "Cart cleared successfully ✅",
        userCart,
      });
    } else {
      return res.status(400).json({ error: "Cart is already empty" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Search product by name
module.exports.searchProductsByName = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Product name required to search for a product!" });
    }

    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "Product does not exist!" });
    }

    res.status(200).json({ message: "Product(s) found!", products });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Search for products by price range
module.exports.searchProductsByPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.body;
    if (!minPrice || !maxPrice) {
      return res.status(400).json({ error: "Min price and max price are required to search for a product!" });
    }

    const products = await Product.find({
      price: { $gte: minPrice, $lte: maxPrice }
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found within the specified price range" });
    }

    res.status(200).json({ message: "Products found by price range", products });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
