const { User } = require("../models");

const addHardcodedUser = async (req, res) => {
  const data = await User.create({
    name: "Parimal Dave",
    email: "parimal@gmail.com",
    gender: "Male",
  });
  res.status(200).json(data);
};

module.exports = { addHardcodedUser };
