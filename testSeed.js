const { db, campuses, students } = require("./server/db");
// console.log(campuses)
// console.log(db)

const seed = async () => {
  try {
    await db.sync({ force: true });

    // seed your database here!
    await campuses.create({
      name: "Brooklyn College",
      imageUrl:
        "https://macaulay.cuny.edu/wp-content/uploads/2016/07/Brooklyn_College.png",
      address: "2900 Bedford Avenue Brooklyn, NY 11210",
      description:
        "No.1 ETHNICALLY DIVERSE CAMPUS FOR 5TH YEAR U.S. News & World Report, 2022",
    });

    await campuses.create({
      name: "Rutgers Newark",
      imageUrl:
        "https://www.rutgers.edu/sites/default/files/lg_NR17NewarkFall0185N_0.jpg",
      address: "35 Warren Street, Newark, New Jersey 07102",
      description:
        "Best Learning Evironment Wall Street Journal/Times Higher, Education 2022",
    });

    await campuses.create({
      name: "NJIT",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/NJIT-Eberhardt-Hall.jpg",
      address: "University Heights, Newark, New Jersey 07102",
      description: "#1 Public University in New Jersey",
    });

    await campuses.create({
      name: "University of British Columbia",
      imageUrl:
        "https://students.ubc.ca/sites/students.ubc.ca/files/20081968642_5ca4cc76d5_k_0.jpg",
      address: "2329 West Mall Vancouver, BC Canada V6T 1Z4",
      description:
        "consistently ranked among the top 20 public universities in the world.",
    });

    await students.create({
      firstName: "Ivan",
      lastName: "Leon",
      email: "ivanleon@email.com",
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcreazilla-store.fra1.digitaloceanspaces.com%2Femojis%2F58614%2Fman-emoji-clipart-md.png&f=1&nofb=1&ipt=25fef579c7ba1d22504e6a04c49ebee2833cc21e6387fbea99a8d4cc457179b8&ipo=images",
      gpa: "3.0",
      campusId: 1,
    });

    await students.create({
      firstName: "Elise",
      lastName: "Drew",
      email: "elisedrew@email.com",
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fgoogle%2Fnoto-emoji-people-face%2F1024%2F10158-woman-icon.png&f=1&nofb=1&ipt=3e554b91e63274a39a38464ce3ea5526dd0428a952049a09e37b170290b0f9b0&ipo=images",
      gpa: "4.0",
      campusId: 1,
    });

    await students.create({
      firstName: "Luna",
      lastName: "Leon",
      email: "LunaLeon@email.com",
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpix.iemoji.com%2Fimages%2Femoji%2Fapple%2Fios-9%2F256%2Folive-toned-girl.png&f=1&nofb=1&ipt=bb666be52f4181fdd8b7949a502998d5a9b0d2d451618127a892de011635f780&ipo=images",
      gpa: "3.5",
      campusId: 1,
    });

    await students.create({
      firstName: "Ari",
      lastName: "Leon",
      email: "AriLeon@email.com",
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipground.com%2Fimages%2Fbaby-emoji-clipart-7.png&f=1&nofb=1&ipt=ae7929d7227ef3b3d12081974512007f020e54d9a2fe41ba5b1cd46aa0e4f1a9&ipo=images",
      gpa: "3.5",
      campusId: 1,
    });
  } catch (err) {
    console.log(err);
  }
};

// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)

async function runSeed() {
  try {
    await seed();
    console.log("Seeding success!");
  } catch (err) {
    console.error("Oh noes! Something went wrong!");
    console.error(err);
  } finally {
    db.close();
  }
}

if (require.main === module) {
  runSeed();
}
