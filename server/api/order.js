const router = require("express").Router();
const { Op } = require("sequelize");
const User = require("../db/models/User");
const Order = require("../db/models/Order");
const OrderProduct = require("../db/models/OrderProduct");
const Product = require("../db/models/Product");

router.get("/", async (req, res, next) => {
  try {
    const id = req.query.id;
    const orders = await Order.findAll({
      where: { userId: id, fulfilled: true },
    });
    res.send({ orders });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    const orderId = order.dataValues.id;
    const orderProducts = await OrderProduct.findAll({
      where: { orderId },
    });
    const productIds = orderProducts.map((info) => info.dataValues.productId);
    const products = await Product.findAll({
      where: {
        id: {
          [Op.in]: productIds,
        },
      },
    });
    res.send({ order, orderProducts, products });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
