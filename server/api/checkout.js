const router = require("express").Router();
const Order = require("../db/models/Order");

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fulfilled } = req.body;
    const order = await Order.findByPk(id);
    await order.update({ fulfilled });
    res.send(order);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
