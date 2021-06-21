const user = require("../models/user");

const Signup = async (req, res) => {
  const { username, email, password } = req.body;
  const usernamesearch = await user.exists({ username: username });
  const emailsearch = await user.exists({ email: email });
  if (usernamesearch) {
    return res.json("This Username already Registered");
  }
  if (emailsearch) {
    return res.json("This Email already Registered");
  }

  let myDetail = new user({ username, password, email });
  await myDetail.save().then(() => {
    return res.json("Thanks for signning up");
  });
};

module.exports = Signup;
