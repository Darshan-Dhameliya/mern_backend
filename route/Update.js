const user = require("../models/user");

module.exports.Updateusername = async (req, res) => {
  const { username, id } = req.body;
  const usernamesearch = await user.exists({ username: username });
  if (usernamesearch) {
    return res.json("This Username already Registered");
  }
  await user.findByIdAndUpdate(
    id,
    { username: username },
    { new: true },
    function (err, docs) {
      if (err) {
        return res.json("something went wrong try again");
      } else {
        return res.json("Succesfull update username");
      }
    }
  );
};

module.exports.password = async (req, res) => {
  const id = req.params.id;
  const { password, newpassword } = req.body;
  await user.findById(id, async (err, data) => {
    if (data.password === password) {
      await user.findByIdAndUpdate(
        id,
        { password: newpassword },
        { new: true },
        function (err, docs) {
          if (err) {
            return res.json("something went wrong try again");
          } else {
            return res.json("succesful Update Password");
          }
        }
      );
    } else {
      return res.json("please enter correct password");
    }
  });
};
