const Product = require("../models/Product.js");

// Create a new product
module.exports.createProduct = (req, res) => {
  let newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    imageUrl: req.body.imageUrl,
  });

  newProduct
    .save()
    .then((product) => {
      const createdProduct = {
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        imageUrl: product.imageUrl,
      };
      return res.status(200).json(createdProduct);
    })
    .catch((err) => {
      console.error("Error creating product:", err);
      return res
        .status(500)
        .json({ error: "Could not create product", message: err.message });
    });
};

// Retrieve all products (Admin Only)
module.exports.getAllProducts = (req, res) => {
  return Product.find({})
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => res.status(500).json(err));
};

// Retrieve all active products
module.exports.getAllActiveProducts = (req, res) => {
  return Product.find({ isActive: true }).then((result) => {
    return res.status(200).json(result);
  });
};

// Retrieve a specific product
module.exports.getProduct = (req, res) => {
  return Product.findById(req.params.productId).then((result) => {
    return res.status(200).json(result);
  });
};

// Update a specific product (Admin Only)
module.exports.updateProduct = async (req, res) => {
  try {
    let updatedProduct = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      imageUrl: req.body.imageUrl,
    };

    const product = await Product.findByIdAndUpdate(req.params.productId, updatedProduct);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};


// Archive a product (Admin Only)
module.exports.archiveProduct = (req, res) => {
  return Product.findByIdAndUpdate(req.params.productId, { isActive: false })
    .then((product) => {
      if (product) {
        return res.json(true);
      } else {
        return res.json(false);
      }
    })
    .catch((error) => {
      return res.json(false);
    });
};

// Activate a product (Admin Only)
module.exports.activateProduct = (req, res) => {
  const productId = req.params.productId;

  return Product.findByIdAndUpdate(productId, { isActive: true }).then(
    (product, error) => {
      if (error) {
        return res.json(false);
      } else {
        return res.json(true);
      }
    }
  );
};

// Search for products by name
module.exports.searchProductsByName = async (req, res) => {
  try {
    const { productName } = req.body;

    const products = await Product.find({
      name: { $regex: productName, $options: "i" },
      isActive: true,
    });

    if (products.length === 0) {
      return res.send("No such product found.");
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

// Delete a product
module.exports.deleteProduct = (req, res) => {

  return Product.findByIdAndDelete(req.params.productId)
    .then((product) => {
      if (!product) {
        res.status(400).json({ error: "Delete failed" });
      } else {
        res.status(201).json({ message: "You have deleted a product", product });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error!" });
    });
}