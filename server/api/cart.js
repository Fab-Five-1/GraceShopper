const router = require("express").Router();
const User = require("../db/models/User");
const Order = require("../db/models/Order");
const OrderProduct = require("../db/models/OrderProduct");
const Product = require("../db/models/Product");

router.get("/", async (req, res, next) => {
  try {
    const currentUser = await User.findByToken(req.headers.authorization);
    const order = await currentUser.getOrder();
    console.log("HEY", currentUser, order);
    res.send({ currentUser, order });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
