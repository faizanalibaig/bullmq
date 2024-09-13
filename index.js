const express = require("express");
const init = require("./producer");
const connectDB = require("./src/config/dbConfig");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 8080;

connectDB();
app.get("/producer", (req, res) => {
  res.send("hello");
});

app.get("/worker", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
