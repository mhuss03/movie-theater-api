const express = require("express");
const app = express();
const db = require("../db/connection");

const userRouter = require("./routes/user");
const showRouter = require("./routes/show");

app.use("/users", userRouter);
app.use("/shows", showRouter);

module.exports = app;
