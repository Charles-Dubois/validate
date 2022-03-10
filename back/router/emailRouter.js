const express = require("express");
const router = express.Router();
const userData = require("../data.json");

//Routes

router.get("/:email", (req, res) => {
  const user = userData.find((theUser) => {
    return theUser.data.email.toLowerCase() === req.params.email.toLowerCase();
  });

  if (user) {
    res.json(user);
  } else {
    console.log(req.params.email);
    res.status(400).json({
      message: "error 400 bad request",
      description: "this email doesn't exists",
    });
  }
});
module.exports = router;
