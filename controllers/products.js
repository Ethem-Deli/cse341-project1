const Product = require("../models/product");


exports.getAllProducts = async (req, res, next) => {
  /* GET all products
  //#swagger.tags=["Products"]
  /*
    #swagger.tags = ["Products"]
    #swagger.description = "Get a list of all products"
    #swagger.responses[200] = {
      description: "Products retrieved successfully",
      schema: [
        {
          _id: "60d21b4667d0d8992e610c85",
          name: "Sample Product",
          price: 100,
          description: "A test product",
          createdAt: "2025-09-22T10:00:00.000Z"
        }
      ]
    }
  */
 try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};


exports.getProductById = async (req, res, next) => {
  /* GET single product by ID
  //#swagger.tags=["Products"]
  /*
    #swagger.tags = ["Products"]
    #swagger.description = "Get a single product by ID"
    #swagger.parameters["id"] = {
      in: "path",
      required: true,
      type: "string",
      description: "Product ID"
    }
    #swagger.responses[200] = { description: "Product retrieved successfully" }
    #swagger.responses[404] = { description: "Product not found" }
  */
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  /* CREATE new product
   //#swagger.tags=["Products"]
  /*
  #swagger.tags = ["Products"]
  #swagger.description = "Create a new product"
  #swagger.parameters["body"] = {
    in: "body",
    description: "Product data",
    required: true,
    schema: {
      $name: "Laptop",
      $price: 1500,
      description: "High performance laptop with 16GB RAM and SSD storage",
      $sku: "LAP-1500",
      $quantity: 25,
      $inStock: true,
      category: "Electronics"
    }
  }
  #swagger.responses[201] = { description: "Product created successfully" }
  #swagger.responses[400] = { description: "Validation error" }
*/
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  /* UPDATE product by ID
   /*
  #swagger.tags = ["Products"]
  #swagger.description = "Update an existing product"
  #swagger.parameters["id"] = {
    in: "path",
    description: "Product ID",
    required: true,
    type: "string"
  }
  #swagger.parameters["body"] = {
    in: "body",
    description: "Updated product data",
    required: true,
    schema: {
      name: "Gaming Laptop",
      price: 2000,
      description: "Updated description with better GPU",
      sku: "LAP-2000",
      quantity: 15,
      inStock: true,
      category: "Electronics"
    }
  }
  #swagger.responses[200] = { description: "Product updated successfully" }
  #swagger.responses[400] = { description: "Validation error" }
  #swagger.responses[404] = { description: "Product not found" }
*/
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  /* DELETE product by ID
   //#swagger.tags=["Products"]
  /*
    #swagger.tags = ["Products"]
    #swagger.description = "Delete a product by ID"
    #swagger.parameters["id"] = {
      in: "path",
      required: true,
      type: "string",
      description: "Product ID"
    }
    #swagger.responses[200] = { description: "Product deleted successfully" }
    #swagger.responses[404] = { description: "Product not found" }
  */
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};
