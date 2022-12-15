var express = require("express");
var router = express.Router();
const User = require("../users");



router.post("/login", async (req, resp) => {
   let objectToSend = {};
  try {
    console.log(req.body);
    const email = req.body.email;
    const phone = req.body.phone;
    const passward = req.body.passward;
    const method = req.body.method;

    let result = "";
    if (method == "email") {
      result = await User.findOne({ email: email });
    }
    if (method == "phone") {
      result = await User.findOne({ phone: phone });
    }

    if (passward != result.passward) {
      objectToSend["error"] = true;
      objectToSend["data"] = `Passwoard not match`;
      resp.send(objectToSend);
    } else {
      objectToSend["error"] = false;
      objectToSend["data"] = result;
      resp.send(objectToSend);
    }

  } catch (error) {
     objectToSend["error"] = true;
     objectToSend["data"] = `Invalid Credentials`;
    resp.send(objectToSend);
  }
});

router.post("/registration", async (req, resp) => {
  let objectToSend = {};
  try {
    console.log(req.body);
    const email=req.body.email;
    const phone = req.body.phone;
    result1 = await User.findOne({ email: email });
    result2 = await User.findOne({ phone: phone });

    if (result1!=null) {
         objectToSend["error"] = true;
         objectToSend["data"] = `Email is Already Registered!!`;
      return   resp.send(objectToSend);
    }
    if (result2!=null) {
         objectToSend["error"] = true;
         objectToSend["data"] = `Phone is Already Registered!!`;
      return   resp.send(objectToSend);
    }
    if (result2 == null && result1 == null) {
         let data = new User(req.body);
         let result = await data.save();
         objectToSend["error"] = false;
         objectToSend["data"] = `Registration Done!!!!!!`;
         resp.send(objectToSend);
    }
   
   
  } catch (error) {
    objectToSend["error"] = true;
    objectToSend["data"] = `Data is not correct`;
    resp.send(objectToSend);
  }

});


module.exports = router;
