const user = require("../models/user");

module.exports = async (req, res) => {
  const { usernameORemail, password } = req.body;
  await user.find(
    { $or: [{ username: usernameORemail }, { email: usernameORemail }] },
    (err, userdata) => {
      if (userdata.length <= 0) return res.json("please sign up");
      if (userdata[0].password !== password)
        return res.json("please enter correct password");
      return res.send(userdata[0].id);
    }
  );
};
