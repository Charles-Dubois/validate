const express = require("express");

const router = express.Router();
const Joi = require("joi");
const userData = require("../data.json");
// Conditions de librairie Joi
const user = Joi.object({
  username: Joi.string().alphanum().min(4).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(10).required(),
  city: Joi.string().alphanum().required(),
});

// Middleware pour vérifier les donnée envoyée par un utilisateur
function validUser(req, res, next) {
  const validation = user.validate(req.body);
  if (!validation.error) {
    const newUser = {
      id: Math.floor(Math.random() * (1000 - 1)) + 1,
      data: validation.value,
    };
    userData.push(newUser);

    res.status(201).json({ message: "user added", newUser });
  } else {
    res.status(400).json({
      message: "error 400 bad request",
      description: validation.error.details[0].message,
    });
  }
  next();
}
//Routes
router.get("/", (_req, res) => {
  if (userData.length > 0) {
    res.send(userData);
  } else {
    res.send("Any user added !");
  }
});
router.post("/", validUser, (_req, _res) => {
  console.log("request received");
});
router.get("/:username", (req, res) => {
  const user = userData.find((theUser) => {
    return theUser.data.username === req.params.username;
  });

  if (user) {
    res.json(user);
  } else {
    res.status(400).json({
      message: "error 400 bad request",
      description: "this user doesn't exists",
    });
  }
});
module.exports = router;
