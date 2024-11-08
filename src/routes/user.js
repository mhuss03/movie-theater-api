const express = require("express");
const userRouter = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../db/connection");
const { User, Show } = require("../../models/index");
userRouter.use(express.json());
userRouter.use(express.urlencoded());

userRouter.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findByPk(id);
  res.json(user);
});

userRouter.get("/:id/shows", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({
    where: { id },
    include: Show,
  });
  res.json(user);
});

userRouter.put("/:userId/shows/:showId", async (req, res) => {
  const { userId, showId } = req.params;

  const user = await User.findByPk(userId);
  const show = await Show.findByPk(showId);
  await user.addShow(show);
  res.send("Successful");
});
module.exports = userRouter;
