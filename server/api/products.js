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

router.delete("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    await product.destroy();

    res.send(product);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    res.send(await product.update(req.body));
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, description, price, quantity, category, imageUrl } = req.body;
    const newProduct = await Product.create({
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      category: category,
      imageUrl: imageUrl,
    });
    res.send(newProduct);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    // gets our ids and finds the order with that id
    const productId = req.params.id;
    let { userId } = req.body;
    let { count } = req.body;
    if (!count) {
      count = 1;
    }
    //create a guest if the userid is null
    let newGuest;
    if (!userId) {
      newGuest = await User.create();
      userId = newGuest.dataValues.id;
    }
    const orders = await Order.findAll({ where: { userId, fulfilled: false } });
    // if there is no order that exists with that id we need to make one
    if (orders.length === 0) {
      // create the order and the order product
      const newOrder = await Order.create({
        userId: userId,
      });
      const orderId = newOrder.dataValues.id;
      const newOrderProduct = await OrderProduct.create({
        numberOfItems: count,
        orderId: orderId,
        productId: productId,
      });
      if (newGuest) {
        // send the response with newGuest included
        return res.send({ orders, newOrderProduct, newGuest });
      }
      // send the response without newGuest
      return res.send({ orders, newOrderProduct });
    } else {
      const orderId = orders[0].dataValues.id;
      const orderProducts = await OrderProduct.findAll({
        where: { orderId, productId },
      });
      // if the orderproduct doesn't exist create one
      if (orderProducts.length === 0) {
        const newOrderProduct = await OrderProduct.create({
          numberOfItems: count,
          orderId: orderId,
          productId: productId,
        });
        if (newGuest) {
          // send the response with newGuest included
          return res.send({ orders, newOrderProduct, newGuest });
        }
        // send the response without newGuest
        return res.send({ orders, newOrderProduct });
      }
      // if it does update the quanity plus what was added
      let numberOfItems = orderProducts[0].dataValues.numberOfItems + count;
      await orderProducts[0].update({ numberOfItems });
      if (newGuest) {
        // send the response with newGuest included
        return res.send({ orderProducts, newGuest });
      }
      // send the response without newGuest
      return res.send(orderProducts);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});
