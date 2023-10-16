const express = require("express");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/users-routes");
const topicsRoutes = require("./routes/topics-routes");

const app = express();

app.use(express.json());
app.use("/api/users", usersRoutes);
app.use("/api/topics", topicsRoutes);

// Connect to db
const connectDB = require("./config/db");
connectDB();
