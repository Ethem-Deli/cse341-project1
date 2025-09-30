const router = require("express").Router();
const productsController = require("../controllers/products");
const validate = require("../middleware/validate");
const { productCreate, productUpdate } = require("../validation/productValidation");
const { ensureAuthenticated } = require("../middleware/ensureAuth");

// Get all products
router.get("/", productsController.getAllProducts);
// Get product by ID
router.get("/:id", productsController.getProductById);
// Create new product
router.post("/", ensureAuthenticated, validate(productCreate), productsController.createProduct);
// Update product by ID
router.put("/:id", ensureAuthenticated, validate(productUpdate), productsController.updateProduct);
// Delete product by ID
router.delete("/:id", ensureAuthenticated, productsController.deleteProduct);
// Export the router
module.exports = router;
