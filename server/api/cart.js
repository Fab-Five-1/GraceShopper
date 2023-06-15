const router = require("express").Router();
const { Op } = require("sequelize");
const User = require("../db/models/User");
const Order = require("../db/models/Order");
const OrderProduct = require("../db/models/OrderProduct");
const Product = require("../db/models/Product");

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const userId = user.dataValues.id;
    const orders = await Order.findAll({
      where: { userId },
    });
    const orderId = orders[0].dataValues.id;
    const orderProducts = await OrderProduct.findAll({
      where: { orderId },
    });
    const orderProductIds = orderProducts.map((info) => info.dataValues.id);
    const products = await Product.findAll({
      where: {
        orderProductId: {
          [Op.in]: orderProductIds,
        },
      },
    });
    res.send({ user, orders, orderProducts, products });
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const id = req.body.orderProduct[0].id;
    const orderProduct = await OrderProduct.findByPk(id);
    console.log("YOOOOO", orderProduct);
    res.send(await orderProduct.update(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
