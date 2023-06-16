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


router.post("/products", async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body))
  }
  catch (err) {
    console.log(err)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { userId } = req.body;
    const orders = await Order.findAll({ where: { userId, fulfilled: false } });
    if (orders.length === 0) {
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
      res.send({ orders, newOrderProduct });
      return;
    } else {
      const orderId = orders[0].dataValues.id;
      const orderProducts = await OrderProduct.findAll({
        where: { orderId, productId },
      });
      if (orderProducts.length === 0) {
        const newOrderProduct = await OrderProduct.create({
          numberOfItems: 1,
          orderId: orderId,
          productId: productId,
        });
        res.send({ orders, newOrderProduct });
        return;
      }
      let numberOfItems = orderProducts[0].dataValues.numberOfItems + 1;
      await orderProducts[0].update({ numberOfItems });
      res.send(orderProducts);
      return;
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});
