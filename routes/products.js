const express = require("express");
const router = express.Router();
const products = require("../controllers/products");
const validate = require("../middleware/validate");
const { productCreate, productUpdate } = require("../validation/productValidation");
const { ensureAuthenticated } = require("../auth/middleware");

// GET all products
router.get("/", products.getAllProducts);
// GET one product
router.get("/:id", products.getProductById);
// CREATE new product
/**
 * @route POST /products
 * @security bearerAuth
 */
router.post("/", ensureAuthenticated, validate(productCreate), products.createProduct);
// UPDATE a product
/**
 * @route PUT /products/{id}
 * @security bearerAuth
 */
router.put("/:id", ensureAuthenticated, validate(productUpdate), products.updateProduct);
// DELETE a product
/**
 * @route DELETE /products/{id}
 * @security bearerAuth
 */
router.delete("/:id", ensureAuthenticated, products.deleteProduct);

module.exports = router;
