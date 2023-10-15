const express = require("express");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/users-routes");

const app = express();

app.use(express.json());
app.use("/api/users", usersRoutes);

mongoose
  .connect(
    "mongodb+srv://orangedev:01031993wonho@cluster-0.jnzc7cc.mongodb.net/users?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
    console.log("Connected to db!");
  })
  .catch((err) => console.log(`Connection failed :( ${err}`));
