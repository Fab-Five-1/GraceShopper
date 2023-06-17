const router = require("express").Router();
const Order = require("../db/models/Order");

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    console.log(order);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
