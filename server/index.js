const express = require("express");
const fileUpload = require("express-fileupload");

const users = require("./routes/users");
const topics = require("./routes/topics");

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use("/api/users", users);
app.use("/api/topics", topics);

// Allow cross-site requests
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// Connect to db
const connectDB = require("./config/db");
connectDB();

app.listen(process.env.PORT, () => console.log(`Listening on port ${port}`));
