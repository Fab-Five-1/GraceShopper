const router = require("express").Router();
const User = require("../db/models/User");
const Order = require("../db/models/Order");
const OrderProduct = require("../db/models/OrderProduct");
const {
  models: { Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.send(product);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    // gets our ids and finds the order with that id
    const productId = req.params.id;
    let { userId } = req.body;
    //create a guest if the userid is null
    let newGuest;
    if (!userId) {
      newGuest = await User.create();
      userId = newGuest.dataValues.id;
    }
    const orders = await Order.findAll({ where: { userId, fulfilled: false } });
    // if there is no order that exists with that id we need to make one
    if (orders.length === 0) {
      // create the order and the order  product
      const newOrder = await Order.create({
        userId: userId,
      });
      const orders = await Order.findAll({
        where: { userId, fulfilled: false },
      });
      const orderId = orders[0].dataValues.id;
      const newOrderProduct = await OrderProduct.create({
        numberOfItems: 1,
        orderId: orderId,
        productId: productId,
      });
      if (newGuest) {
        res.send({ orders, newOrderProduct, newGuest });
      }
      res.send({ orders, newOrderProduct });
      return;
      // else if the order exists find it's id then attach the order product
    } else {
      const orderId = orders[0].dataValues.id;
      const orderProducts = await OrderProduct.findAll({
        where: { orderId, productId },
      });
      // if the orderpoduct doesn't exist create one
      if (orderProducts.length === 0) {
        const newOrderProduct = await OrderProduct.create({
          numberOfItems: 1,
          orderId: orderId,
          productId: productId,
        });
        if (newGuest) {
          res.send({ orders, newOrderProduct, newGuest });
        }
        res.send({ orders, newOrderProduct });
        return;
      }
      // if it does update the quanity plus what was added
      let numberOfItems = orderProducts[0].dataValues.numberOfItems + 1;
      await orderProducts[0].update({ numberOfItems });
      if (newGuest) {
        res.send({ orderProducts, newGuest });
      }
      res.send(orderProducts);
      return;
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});
