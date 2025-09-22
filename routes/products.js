const express = require("express");
const router = express.Router();
const products = require("../controllers/products");
const validate = require("../middleware/validate");
const { productCreate, productUpdate } = require("../validation/productValidation");
const { ensureAuthenticated } = require("../auth/middleware");

router.get("/", products.getAllProducts);
router.get("/:id", products.getProductById);
router.post("/", ensureAuthenticated, validate(productCreate), products.createProduct);
router.put("/:id", ensureAuthenticated, validate(productUpdate), products.updateProduct);
router.delete("/:id", ensureAuthenticated, products.deleteProduct);

module.exports = router;
