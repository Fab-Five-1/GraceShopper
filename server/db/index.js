//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const OrderProduct = require("./models/OrderProduct");
const Order = require("./models/Order");

//associations could go here!

// Associations
Product.belongsTo(OrderProduct); // Each product belongs to an OrderProduct
OrderProduct.hasMany(Product); // Each OrderProduct has many Products

module.exports = {
  db,
  models: {
    User,
    Product,
    OrderProduct,
    Order,
  },
};
