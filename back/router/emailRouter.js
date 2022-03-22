const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
//Routes

router.get("/:email", async (req, res) => {
  let user;
  try {
    user = await Postgres.query("SELECT * FROM users WHERE LOWER(email) = $1", [
      req.params.email.toLowerCase(),
    ]);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "This mail does not exists",
    });
  }
  const result = user.rows;
  res.json(result);
});
module.exports = router;
