const Sequelize = require("sequelize");
const db = require("../db");

const OrderProduct = db.define("orderProducts", {
  numberOfItems: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

module.exports = OrderProduct;
