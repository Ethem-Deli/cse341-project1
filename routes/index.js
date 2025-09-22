const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=["Hello World"]
  res.send("Hello World!");
});

router.use("/users", require("./users"));
router.use("/contacts", require("./contacts"));
router.use("/tasks", require("./tasks"));
router.use("/products", require("./products"));
router.use('/auth', require('./auth')); 

module.exports = router;
