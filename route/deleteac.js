const user = require("../models/user");

module.exports = async (req, res) => {
  const { password, id } = req.body;

  await user.findById(id, async (err, data) => {
    console.log(data);
    if (!!data === false) {
      return res.json("something went wrong try again");
    } else if (data.password === password) {
      await user.findByIdAndDelete(id, function (err, docs) {
        if (err) {
          return res.json("something went wrong try again");
        } else {
          return res.json("succesful Delete your a/c");
        }
      });
    } else {
      return res.json("please insert correct password");
    }
  });
};
