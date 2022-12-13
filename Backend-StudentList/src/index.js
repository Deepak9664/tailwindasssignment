const express = require("express");
const route = require("./route/route.js");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://Deepak1234:TrU8MdmpPJ72rGI3@cluster0.l1wlrcl.mongodb.net/test",{
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use("/", route);

app.listen(3000, () => {
  console.log("Express app running on port " + 3000);
});