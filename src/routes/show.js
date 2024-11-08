const express = require("express");
const showRouter = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../db/connection");
const { User, Show } = require("../../models");

showRouter.use(express.json());
showRouter.use(express.urlencoded());

showRouter.get("/", async (req, res) => {
  const shows = await Show.findAll();
  res.json(shows);
});

showRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  const show = await Show.findByPk(id);
  res.json(show);
});

showRouter.get("/:id/users", async (req, res) => {
  const id = req.params.id;

  const users = await Show.findOne({
    where: { id },
    include: User,
  });

  res.json(users);
});

showRouter.put("/:id/available", async (req, res) => {
  const id = req.params.id;

  const show = await Show.findByPk(id, { attributes: ["id", "available"] });

  const updatedShow = await show.update({ available: !show.available });

  res.json({
    message: "Show availability updated successfully",
    show: updatedShow,
  });
});

showRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const show = await Show.findByPk(id);

  const deletedShow = await show.destroy();

  res.json({
    message: "Show deleted successfully",
    show: deletedShow,
  });
});

showRouter.get("/genre/:genre", async (req, res) => {
  const genre = req.params.genre;

  const show = await Show.findAll({ where: { genre } });
  res.json({
    message: "All shows in this Genre",
    show: show,
  });
});

module.exports = showRouter;
