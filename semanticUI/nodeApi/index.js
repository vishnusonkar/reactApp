const express =require('express')
require('./config')
const User=require('./users')

const app = express();

app.use(express.json())
const cors = require("cors");
app.use(cors());



var login = require("./data/login");
app.use("/user", login);


app.get("/getLoginUser",async(req,resp)=>{
  let data =await User.find();
  resp.send(data);
})

app.post("/createUser",async(req,resp)=>{
  let data = new User(req.body);
  let result = await data.save();
  // console.log(result);
  resp.send("Data Inserted Successfully!!!!!!")
})


app.put("/updateUser/:_id", async (req, resp) => {
  // const uid = `${req.params._id}${req.params._id}`;
  let data = await User.updateOne(req.params, {
    $set: req.body,
  });
  // console.log(data);
  resp.send("Data Updated Succcessfully!!!")
});


app.delete("/deleteUser/:_id", async (req, resp) => {
  let data = await User.deleteOne(req.params);
// console.log(data);
  resp.send("Data Deleted Succcessfully!!!");
});


app.listen(3007);
console.log("server listen on port 3007");