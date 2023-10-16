const express = require("express");
const fileUpload = require("express-fileupload");
const port = 5000;

const usersRoutes = require("./routes/users-routes");
const topicsRoutes = require("./routes/topics-routes");

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use("/api/users", usersRoutes);
app.use("/api/topics", topicsRoutes);

// Connect to db
const connectDB = require("./config/db");
connectDB();

app.listen(port, () => console.log(`Listening on port ${port}`));
