const router = require("express").Router();
const productsController = require("../controllers/products");
const validate = require("../middleware/validate");
const { productCreate, productUpdate } = require("../validation/productValidation");
const { ensureAuthenticated } = require("../middleware/ensureAuth");

/* GET all products */
router.get("/", productsController.getAllProducts);

/* GET single product by ID */
router.get("/:id", productsController.getProductById);

/* CREATE new product */
router.post("/", ensureAuthenticated, validate(productCreate), productsController.createProduct);

/* UPDATE product by ID */
router.put("/:id", ensureAuthenticated, validate(productUpdate), productsController.updateProduct);

/* DELETE product by ID */
router.delete("/:id", ensureAuthenticated, productsController.deleteProduct);

module.exports = router;
