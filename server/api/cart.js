const router = require("express").Router();
const User = require("../db/models/User");
const Order = require("../db/models/Order");
const OrderProduct = require("../db/models/OrderProduct");
const Product = require("../db/models/Product");

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const order = await user.getOrder();
    const orderId = order[0].dataValues.id;
    const orderProducts = await OrderProduct.findAll({
      where: { orderId },
    });
    console.log("Prodcut", orderProducts);
    console.log("HEY", order[0].dataValues.id);
    res.send({ user, order });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
