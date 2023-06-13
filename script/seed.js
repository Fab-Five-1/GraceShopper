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
      username: "XxcodyxX",
      email: "CJohnson@gmail.com",
      firstName: "cody",
      lastName: "Johnson",
    }),
    User.create({
      username: "XxCalebxX",
      email: "cjbel@gmail.com",
      firstName: "Caleb",
      lastName: "Bellmyer",
    }),
    User.create({
      username: "XxIvanxX",
      email: "ILeon@gmail.com",
      firstName: "Ivan",
      lastName: "Leon",
    }),
    User.create({
      username: "XxJovanxX",
      email: "JStosic@gmail.com",
      firstName: "Jovan",
      lastName: "Stosic",
    }),
    User.create({
      username: "XxMichellexX",
      email: "MAberizk@gmail.com",
      firstName: "Michelle",
      lastName: "Aberizk",
    }),
    User.create({
      username: "XxSuzyxX",
      email: "SCollins@hotmail.com",
      firstName: "Suzy",
      lastName: "Collins",
    }),
    User.create({
      username: "XxJonnyBlazexX",
      email: "JonnyBlaze@gmail.com",
      firstName: "Jonny",
      lastName: "Blaze",
    }),
  ]);

  const product = await Promise.all([
    Product.create({
      name: "Test Product",
      descritption: "This is a  description I don't know how to spell",
      price: 4.99,
      quantity: 15,
      category: "toys",
    }),
    Product.create({
      name: "Product for testing",
      descritption: "This is another product that is fake",
      price: 17.99,
      quantity: 35,
      category: "phones",
    }),
    Product.create({
      name: "I am fake",
      descritption: "Hello welcome to fake prodcut page with fake info",
      price: 521.99,
      quantity: 5,
      category: "toys",
    }),
    Product.create({
      name: "Product10000",
      descritption: "HIIIIIIIII",
      price: 34.99,
      quantity: 40,
      category: "shoes",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
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
