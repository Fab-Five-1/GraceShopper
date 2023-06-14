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

OrderProduct.belongsTo(Order); // Each OrderProduct belongs to Order
Order.hasMany(OrderProduct); // Each Order has many OrderProduct

Order.belongsTo(User); // Each Order belong to a User
User.hasMany(Order); // Each User has many Order

module.exports = {
  db,
  models: {
    User,
    Product,
    OrderProduct,
    Order,
  },
};
