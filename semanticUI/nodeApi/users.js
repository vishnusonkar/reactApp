const mongoose = require("mongoose");
const UsersSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  passward: String,
});
module.exports = mongoose.model("users", UsersSchema);