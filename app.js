const express = require("express");
const { sequelize } = require("./models");
const userController = require("./controller/userController");

const app = express();
// Use json middleware to make sure body received is in json format
app.use(express.json());

// api to add hardcoded user
app.get("/addhardcodeduser", userController.addHardcodedUser);

// creates listener for accepting requests
app.listen({ port: 5000 }, async () => {
  console.log("Server up on http://localhosT:5000");

  // Creates tables in database based on models we have
  // Will drop database everytime the app runs. So we need to change this. Hence commented
  // await sequelize.sync({ force: true });

  // This will just connect to database
  await sequelize.authenticate();
  console.log("Databse Connected");
});
