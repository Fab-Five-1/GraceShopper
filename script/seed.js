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
      isAdmin: true,
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
      orderId: 1,
    }),
    OrderProduct.create({
      numberOfItems: 4,
      orderId: 1,
    }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "Apple iPod",
      description:
        "The original iPod, introduced on October 23, 2001, was the first MP3 player to pack a mind-blowing 1,000 songs and a 10-hour battery into a stunning 6.5-ounce package. iPod mini, introduced on February 20, 2004, brought everything users loved about iPod into a smaller design at just 3.6 ounces",
      price: 9800,
      quantity: 15,
      category: "audio",
      imageUrl:
        "https://hips.hearstapps.com/bpc.h-cdn.co/assets/16/42/2001-apple-ipod.jpg?crop=1xw:1.0xh;center,top&resize=980:*",
      orderProductId: 1,
    }),
    Product.create({
      name: "Sony Playstation",
      description:
        "PlayStation is a brand of a series of game consoles created and developed by Sony Computer Entertainment. PlayStation was first introduced in December 1994 in Japan, when Sony released the first PlayStation console. The first PlayStation console was the first console to sell 100 million units, which it accomplished in less than 10 years. The PlayStation 2 is the best-selling console to date, with 150 million in sales as of January 31, 2011.",
      price: 39900,
      quantity: 35,
      category: "gaming",
      imageUrl:
        "https://hips.hearstapps.com/bpc.h-cdn.co/assets/16/42/1994-sony-playstation.jpg?crop=1xw:1.0xh;center,top&resize=980:*",
      orderProductId: 2,
    }),
    Product.create({
      name: "Motorola MicroTAC",
      description:
        "The Motorola MicroTAC, introduced in 1989, was a significant milestone in the history of mobile phones. It was one of the first commercially available flip phones and gained popularity for its compact size and advanced features at the time.",
      price: 70000,
      quantity: 5,
      category: "phone",
      imageUrl:
        "https://hips.hearstapps.com/bpc.h-cdn.co/assets/16/42/1989-motorola-microtac.jpg?crop=1xw:1.0xh;center,top&resize=980:*",
    }),
    Product.create({
      name: "Sony Walkman",
      description:
        "The Sony Walkman, introduced in 1979, revolutionized the way people listened to music and became an iconic cultural symbol. It was a portable cassette player that allowed users to listen to their favorite music on the go.",
      price: 29800,
      quantity: 40,
      category: "audio",
      imageUrl:
        "https://hips.hearstapps.com/bpc.h-cdn.co/assets/16/42/1979-sony-walkman.jpg?crop=1xw:1.0xh;center,top&resize=980:*",
    }),

    Product.create({
      name: "Atari 2600",
      description:
        "The Atari 2600 is credited with taking video game consoles mainstream almost 40 years ago. Each console shipped with a duo of joysticks and a game cartridge. The Atari 2600 remained in production for almost a quarter of a century.",
      price: 4000,
      quantity: 24,
      category: "gaming",
      imageUrl:
        "https://hips.hearstapps.com/bpc.h-cdn.co/assets/16/42/480x480/square-1477059131-1977-atari-2600.jpg?resize=980:*",
    }),
    Product.create({
      name: "Apple PowerBook 100",
      description:
        "The PowerBook 100 by Apple was an entry-level model when it debuted in 1991. However, it impressed with its compact design and built-in trackball. The latter made navigating through the System OS an easy affair.",
      price: 39900,
      quantity: 4,
      category: "computer",
      imageUrl:
        "https://hips.hearstapps.com/bpc.h-cdn.co/assets/16/42/1991-apple-powerbook-100.jpg?crop=1xw:1.0xh;center,top&resize=980:*",
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
