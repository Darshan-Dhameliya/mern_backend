const user = require("../models/user");

module.exports = async (req, res) => {
  const id = req.params.id;
  await user.findById(id, (err, userinfo) => {
    if (err) return console.log(err);
    res.send(userinfo);
  });
};
