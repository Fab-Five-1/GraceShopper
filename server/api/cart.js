const router = require("express").Router();
const User = require("../db/models/User");
const Order = require("../db/models/Order");
const OrderProduct = require("../db/models/OrderProduct");
const Product = require("../db/models/Product");

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const userId = user.dataValues.id;
    const order = await Order.findAll({
      where: { userId },
    });
    const orderId = order[0].dataValues.id;
    const orderProducts = await OrderProduct.findAll({
      where: { orderId },
    });
    console.log("Prodcut", orderProducts);
    console.log("HEY", order);
    res.send({ user, order });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
