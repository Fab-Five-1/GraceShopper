const router = require("express").Router();
const { Op } = require("sequelize");
const User = require("../db/models/User");
const Order = require("../db/models/Order");
const OrderProduct = require("../db/models/OrderProduct");
const Product = require("../db/models/Product");

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const userId = user.dataValues.id;
    const orders = await Order.findAll({
      where: { userId, fulfilled: true },
    });
    const orderIds = orders.map((info) => info.dataValues.id);
    const orderProducts = await OrderProduct.findAll({
      where: {
        id: {
          [Op.in]: orderIds,
        },
      },
    });
    const productIds = orderProducts.map((info) => info.dataValues.productId);
    const products = await Product.findAll({
      where: {
        id: {
          [Op.in]: productIds,
        },
      },
    });
    res.send({ user, orders, orderProducts, products });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
