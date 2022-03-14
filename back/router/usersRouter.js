const express = require("express");

const router = express.Router();
const Joi = require("joi");
const userData = require("../data.json");
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
router.get("/", (_req, res) => {
  if (userData.length > 0) {
    res.json(userData);
  } else {
    res.send("Any user added !");
  }
});
router.post("/", validUser, (req, res) => {
  {
    const newUser = {
      id: Math.floor(Math.random() * (1000 - 1)) + 1,
      data: req.body,
    };
    userData.push(newUser);

    res.status(201).json({ message: "user added", newUser });
  }
  console.log("request received");
});
router.get("/:username", (req, res) => {
  const user = userData.find((theUser) => {
    return (
      theUser.data.username.toLowerCase() === req.params.username.toLowerCase()
    );
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "error 404 not found",
      description: "this user doesn't exists",
    });
  }
});
module.exports = router;
