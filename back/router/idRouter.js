const express = require("express");
const router = express.Router();
const userData = require("../data.json");

//Routes

router.get("/:id", (req, res) => {
  const user = userData.find((theUser) => {
    return theUser.id.toString() === req.params.id.toString();
  });

  if (user) {
    res.json(user);
  } else {
    res.status(400).json({
      message: "error 400 bad request",
      description: "this id doesn't exists",
    });
  }
});
module.exports = router;
