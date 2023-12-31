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
      where: { userId, fulfilled: false },
    });
    if (orders.length === 0) {
      const newOrder = await Order.create({
        userId: userId,
      });
      const orders = await Order.findAll({
        where: { userId, fulfilled: false },
      });
      const orderProducts = [];
      const products = [];
      res.send({ user, orders, orderProducts, products });
    }
    const orderId = orders[0].dataValues.id;
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
    res.send({ user, orders, orderProducts, products });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const orderProductsData = req.body.orderProduct;
    let orderProducts = [];
    for (const orderProductData of orderProductsData) {
      const { id, numberOfItems } = orderProductData;
      const orderProduct = await OrderProduct.findByPk(id);
      orderProducts.push(orderProduct);
      if (orderProduct) {
        await orderProduct.update({ numberOfItems });
      }
    }
    res.send(orderProducts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { total } = req.body;
    const order = await Order.findByPk(id);
    await order.update({ total });
    res.send(order);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const orderProduct = await OrderProduct.findByPk(req.params.id);
    const orderId = orderProduct.dataValues.orderId;
    if (orderProduct) {
      await orderProduct.destroy();
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
      return res.send({ orderProducts, products });
    }
    return;
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
