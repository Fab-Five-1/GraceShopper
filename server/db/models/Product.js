const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    isEmpty: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    isEmpty: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    isEmpty: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
  },
});

module.exports = Product;
