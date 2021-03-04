const express = require("express");
const app = express();
var cors = require("cors");
//connection mongodb
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/userdata", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const detailSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const user = mongoose.model("userinfo", detailSchema);
//connection mongodb
//reference geeksforgeeks
app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const usernamesearch = await user.exists({ username: username });
  const emailsearch = await user.exists({ email: email });

  console.log(emailsearch);
  if (usernamesearch) {
    return res.json("This Username already Registered");
  }
  if (emailsearch) {
    return res.json("This Email already Registered");
  }

  let myDetail = new user({ username, password, email });
  myDetail.save().then(() => {
    return res.json("hello");
  });
});

app.post("/logindata", (req, res) => {
  const { email, password } = req.body;
  user.find(
    { $or: [{ username: email }, { email: email }] },
    (err, userdata) => {
      if (userdata.length <= 0) return res.json("please sign up");
      if (userdata[0].password !== password)
        return res.json("please enter correct password");
      return res.send(userdata[0].id);
    }
  );
});

app.get("/getdetails/:id", (req, res) => {
  const id = req.params.id;
  user.findById(id, (err, userinfo) => {
    if (err) return console.log(err);
    res.send(userinfo);
  });
});

app.post("/updateusername", (req, res) => {
  const { username, id } = req.body;

  user.findByIdAndUpdate(
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
});

app.post("/deleteac", (req, res) => {
  const { password, id } = req.body;

  user.findById(id, (err, data) => {
    if (data === null) {
      return res.json("something went wrong try again");
    } else if (data.password === password) {
      user.findByIdAndDelete(id, function (err, docs) {
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
});

app.post("/changepass/:id", (req, res) => {
  const id = req.params.id;
  const { password, newpassword } = req.body;
  user.findById(id, (err, data) => {
    if (data.password === password) {
      user.findByIdAndUpdate(
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
      return res.json("please insert correct password");
    }
  });
});

app.listen(3020, () => console.log("Server OK"));
