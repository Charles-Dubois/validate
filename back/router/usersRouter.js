const express = require("express");
const router = express.Router();
const Joi = require("joi");

const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
// Conditions de librairie Joi
const user = Joi.object({
  username: Joi.string().alphanum().min(4).required(),
  email: Joi.string().email().required(),
  age: Joi.string().pattern(new RegExp("^[0-9]{2,2}$")).required(),
  city: Joi.string().alphanum().required(),
});

// Middleware pour vérifier les donnée envoyée par un utilisateur
function validUser(req, res, next) {
  const validation = user.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: "error 400 bad request",
      description: validation.error.details[0].message,
    });
  }
  next();
}
//Routes
router.get("/", async (_req, res) => {
  let users;
  try {
    users = await Postgres.query("SELECT * FROM users");
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Any user added !",
    });
  }
  const result = users.rows;
  res.json(result);
});
router.post("/", validUser, async (req, res) => {
  try {
    await Postgres.query(
      "INSERT INTO users ( username, email, age, city)VALUES($1, $2, $3, $4);",
      [req.body.username, req.body.email, req.body.age, req.body.city]
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Error",
    });
  }
  res.status(201).json({ message: "user added" });

  console.log("request received");
});
router.get("/:username", async (req, res) => {
  let user;
  try {
    user = await Postgres.query(
      "SELECT * FROM users WHERE LOWER(username) = $1",
      [req.params.username.toLowerCase()]
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "This user does not exists",
    });
  }
  const result = user.rows;
  res.json(result);
});
module.exports = router;
