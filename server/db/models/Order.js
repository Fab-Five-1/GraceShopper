const Sequelize = require("sequelize");
const db = require("../db");

const Orders = db.define("orders", {
  fulfilled: Sequelize.BOOLEAN,
});

module.exports = Orders;
