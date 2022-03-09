const express = require("express");
const app = express();
app.use(express.json());
const usersRouter = require("./router/usersRouter");
const emailRouter = require("./router/emailRouter");
const idRouter = require("./router/idRouter");
app.use("/users", usersRouter);
app.use("/email", emailRouter);
app.use("/id", idRouter);
app.get("/", (_req, res) => {
  res.send(
    "use endpoint /users whith GET method to show all users \n use endpoint /users whith POST method to add a user \n use endpoint /users/:username whith GET method to show the user who correspond \n use endpoint /email/:email@exemple.com whith GET method to see the user who correspond \n use use endpoint /id/:id whith GET method to see the user who correspond "
  );
});

app.get("*", (_res, res) => {
  res.send("error 404");
});
app.listen(8000, () => {
  console.log("listening on port 8000");
});
