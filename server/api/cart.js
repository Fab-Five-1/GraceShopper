const router = require("express").Router();
const User = require("../db/models/User");
const Order = require("../db/models/Order");
const OrderProduct = require("../db/models/OrderProduct");
const Product = require("../db/models/Product");

router.get("/cart", async (req, res, next) => {
  try {
    const currentUser = await User.findByToken(req.headers.authorization, {
      include: [
        {
          model: Order,
          include: [OrderProduct],
        },
      ],
    });

    console.log(currentUser);
    res.send(currentUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
