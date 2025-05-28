const express = require("express");
const userRoutes = require("./routes/user");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/users", userRoutes);

module.exports = app;
