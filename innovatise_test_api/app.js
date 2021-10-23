const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
var mongoose = require("mongoose");
var userRouter = require('./routes/user');
const db = require('./models/index');
dotenv.config();
const app = express();  //Create new instance
const PORT = process.env.PORT || 5000; //Declare the port number
app.use(express.json()); //allows us to access request body as req.body
app.use(morgan("dev"));  //enable incoming request logging in dev mode

 
//Define the endpoint
app.get("/ping", (req, res) => {  
  return res.send({
    status: "Healthy",
  });
});
db.connectDb().then(async (data) =>{
  console.log('DB connected ---');
  app.listen(PORT, () => {
    console.log("Server started listening on port : ", PORT);
  });
})
app.use('/api', userRouter);
require('./models/user');

module.exports = app;

