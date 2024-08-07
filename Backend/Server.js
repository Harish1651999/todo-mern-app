const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const taskRoutes = require("./Routes/TaskRoute");

const app = express();

//Middleware
app.use((req, res, next) => {
  console.log("path " + req.path + " method " + req.method);
  next();
});

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "DB connected successfully and listening to " + process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/tasks", taskRoutes);
