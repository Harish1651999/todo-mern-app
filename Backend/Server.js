const express = require("express");
require("dotenv").config();
const app = express();

//Middleware
app.use((req, res, next) => {
  console.log("path " + req.path + " method " + req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log("Listening to " + process.env.PORT);
});
