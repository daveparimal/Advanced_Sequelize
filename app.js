const express = require("express");
const { sequelize } = require("./models");
const userController = require("./controller/userController");

const app = express();
// Use json middleware to make sure body received is in json format
app.use(express.json());

// api to add hardcoded user
app.get("/addhardcodeduser", userController.addHardcodedUser);
app.get("/bulkaddhardcodeduser", userController.bulkAddHardcodedUser);
app.get("/findallusers", userController.findAllUsers);
app.get("/findfirstuser", userController.findFirstUser);
app.get("/getonlyfewcolumns", userController.getOnlyFewColumnsOfAll);
app.get("/excludeandinclude", userController.excludeAndInclude);
app.get("/findqueries", userController.findQueries);
app.get("/getbygrouporderlimit", userController.getByGroupOrderLimit);
app.get("/adddata", userController.addData);
app.get("/onetoone", userController.getOneToOne);
app.get("/manytomany", userController.manyOneToMany);
app.get("/scopes", userController.Scope);
app.get("/addOneToManyPolymorpicData", userController.oneToManyPolymorphic);
app.get(
  "/readOneToManyPolymorpicData",
  userController.readOneToManyPolymorphic
);
app.get("/addimagevideotagdata", userController.addImageVideoTagData);
app.get(
  "/readManyToManyPolymorpicData",
  userController.readManyToManyPolymorphic
);
app.get("/transactions", userController.transactionsExample);

// creates listener for accepting requests
app.listen({ port: 5000 }, async () => {
  console.log("Server up on http://localhost:5000");

  // Creates tables in database based on models we have
  // Will drop database everytime the app runs. So we need to change this. Hence commented
  // await sequelize.sync({ force: true });

  // This will just connect to database
  await sequelize.authenticate();
  console.log("Databse Connected");
});
