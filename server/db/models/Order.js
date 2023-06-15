const Sequelize = require("sequelize");
const db = require("../db");

const Orders = db.define("orders", {
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Orders;
