const express = require("express");
const router = express.Router();
const userData = require("../data.json");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
//Routes

router.get("/:id", async (req, res) => {
  let user;
  try {
    user = await Postgres.query("SELECT * FROM users WHERE id = $1", [
      parseInt(req.params.id),
    ]);
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
