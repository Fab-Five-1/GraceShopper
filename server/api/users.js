const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ["id", "username"], // narrows down to specific views
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// POST route --> /signup
// route will create a new user account so user can have a logged in experience and also add user to db
router.post("/", async (req, res, next) => {
  try {
    console.log("This is body ---->", req.body);

    //grab all the data from req.body and destructs them
    const { username, password, email, firstName, lastName } = req.body;
    //creates a new user in our db using info from the body
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
    });
    //send the newly created user as a response
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});
