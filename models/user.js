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

module.exports = mongoose.model("userinfo", detailSchema);
