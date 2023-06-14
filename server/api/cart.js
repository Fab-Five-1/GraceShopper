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
    const orderProductId = orderProducts[0].dataValues.id;
    const products = await Product.findAll({
      where: { orderProductId },
    });
    res.send([user, order, orderProducts, products]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
