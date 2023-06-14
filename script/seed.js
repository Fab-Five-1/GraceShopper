"use strict";

const {
  db,
  models: { User, Order, OrderProduct, Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "a",
      password: "a",
      email: "a@gmail.com",
      firstName: "a",
      lastName: "a",
    }),
    User.create({
      username: "XxcodyxX",
      password: "123",
      email: "CJohnson@gmail.com",
      firstName: "cody",
      lastName: "Johnson",
    }),
    User.create({
      username: "XxCalebxX",
      password: "123",
      email: "cjbel@gmail.com",
      firstName: "Caleb",
      lastName: "Bellmyer",
    }),
    User.create({
      username: "XxIvanxX",
      password: "123",
      email: "ILeon@gmail.com",
      firstName: "Ivan",
      lastName: "Leon",
    }),
    User.create({
      username: "XxJovanxX",
      password: "123",
      email: "JStosic@gmail.com",
      firstName: "Jovan",
      lastName: "Stosic",
    }),
    User.create({
      username: "XxMichellexX",
      password: "123",
      email: "MAberizk@gmail.com",
      firstName: "Michelle",
      lastName: "Aberizk",
    }),
    User.create({
      username: "XxSuzyxX",
      password: "123",
      email: "SCollins@hotmail.com",
      firstName: "Suzy",
      lastName: "Collins",
    }),
    User.create({
      username: "XxJonnyBlazexX",
      password: "123",
      email: "JonnyBlaze@gmail.com",
      firstName: "Jonny",
      lastName: "Blaze",
    }),
  ]);

  const orders = await Promise.all([
    Order.create({
      fulfilled: false,
      userId: 1,
    }),
  ]);

  const orderProducts = await Promise.all([
    OrderProduct.create({
      numberOfItems: 2,
      totalPrice: 2000,
      orderId: 1,
    }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "Test Product",
      description: "This is a  description I don't know how to spell",
      price: 499,
      quantity: 15,
      category: "toys",
      orderProductId: 1,
    }),
    Product.create({
      name: "Product for testing",
      description: "This is another product that is fake",
      price: 1799,
      quantity: 35,
      category: "phones",
      orderProductId: 1,
    }),
    Product.create({
      name: "I am fake",
      description: "Hello welcome to fake prodcut page with fake info",
      price: 52199,
      quantity: 5,
      category: "toys",
      orderProductId: 1,
    }),
    Product.create({
      name: "Product10000",
      description: "HIIIIIIIII",
      price: 3499,
      quantity: 40,
      category: "shoes",
      orderProductId: 1,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${orderProducts.length} orderProducts`);
  console.log(`seeded ${orders.length} orders`);

  console.log(`seeded successfully`);
  return {
    users,
    products,
    orderProducts,
    orders,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
