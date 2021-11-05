const { User, sequelize, Posts, tags, PostTags } = require("../models");
const { Op, QueryTypes } = require("sequelize");

const addHardcodedUser = async (req, res) => {
  const data = await User.create({
    name: "Parimal Dave",
    email: "parimal@gmail.com",
    gender: "Male",
  });
  res.status(200).json(data);
};

// Bulk Insert
const bulkAddHardcodedUser = async (req, res) => {
  const data = await User.bulkCreate([
    { name: "parimal2", email: "test2@gmail.com", gender: "male" },
    { name: "parimal3", email: "test3@gmail.com", gender: "female" },
    { name: "parimal4", email: "test4@gmail.com", gender: "male" },
    { name: "parimal5", email: "test5@gmail.com", gender: "female" },
  ]);
  res.status(200).json(data);
};

// Get all data from data
const findAllUsers = async (req, res) => {
  // const data = await User.findAll();
  // raw query example
  const data = await sequelize.query("SELECT * from users");
  res.status(200).json(data);
};

// Get first data
const findFirstUser = async (req, res) => {
  const data = await User.findOne();
  res.status(200).json(data);
};

// Get only couple of coulmns from data
// Change name of columns after retrieving
// Count the number of items retrieved.
const getOnlyFewColumnsOfAll = async (req, res) => {
  const data = await User.findAll({
    attributes: [
      "name",
      ["email", "email_details"],
      [sequelize.fn("count", sequelize.col("email")), "email_count"],
    ],
    group: ["name", "email"],
  });
  res.status(200).json(data);
};

// Exclude some columns in response
// include some columns in response

const excludeAndInclude = async (req, res) => {
  const data = await User.findAll({
    attributes: {
      exclude: ["gender"],
      include: [
        [sequelize.fn("CONCAT", sequelize.col("name"), "dave"), "full_name"],
      ],
    },
  });
  res.status(200).json(data);
};

// basic find
// operator
const findQueries = async (req, res) => {
  const data = await User.findAll({
    where: {
      id: {
        [Op.gt]: 2, // id equal to 2
      },
      email: {
        [Op.like]: "%2@gmail.com", // prefixed with anything but ends with @gmail.com
      },
    },
  });
  res.status(200).json(data);
};

// Order By, grouby and limit
// find by primary key
// find and count all
// find or create.
const getByGroupOrderLimit = async (req, res) => {
  const data = await User.findAll({
    where: {
      id: {
        [Op.gt]: 2, // id equal to 2
      },
      email: {
        [Op.like]: "%@gmail.com", // prefixed with anything but ends with @gmail.com
      },
    },
    orderBy: [
      ["name", "DESC"],
      ["email", "DESC"],
    ],
    group: ["id", "email"], // this does not make any difference since there is no column where we are showing grouped results
    offset: 1, // will skip id 3
    limit: 3, // will show only 3 results after offsetting
  });

  const data1 = await User.findByPk(3);

  const data2 = await User.findAndCountAll({
    where: {
      email: {
        [Op.like]: "%2@gmail.com",
      },
    },
  });

  const [data3, created] = await User.findOrCreate({
    where: {
      name: "test",
    },
    defaults: {
      name: "test",
      email: "test@gmail.com",
      gender: "Male",
    },
  });

  res.status(200).json({ data, data1, data2, data3, created });
};

const addData = async (req, res) => {
  // const data = await Posts.create({
  //   name: "Test Name",
  //   title: "Test title",
  //   content: "Test Content",
  //   user_id: 1,
  // });
  // const data = await tags.bulkCreate([
  //   {
  //     name: "Latest",
  //   },
  //   {
  //     name: "Sports",
  //   },
  //   {
  //     name: "Popular",
  //   },
  // ]);
  // const data = await PostTags.bulkCreate([
  //   {
  //     post_id: 1,
  //     tag_id: 1,
  //   },
  //   {
  //     post_id: 1,
  //     tag_id: 2,
  //   },
  //   {
  //     post_id: 2,
  //     tag_id: 3,
  //   },
  // ]);
  // res.status(200).json(data);
};

// one to one
// one to many
const getOneToOne = async (req, res) => {
  const data = await User.findAll({
    where: { id: 1 },
    include: [{ model: Posts, attributes: ["name", "title", "content"] }],
  });

  // const data = await Posts.findAll({
  //   include: [{ model: User }],
  // });
  res.status(200).json(data);
};

// many to many
const manyOneToMany = async (req, res) => {
  // Many to Many Post to Tag
  // const data = await Posts.findAll({
  //   where: { id: 1 },
  //   include: [{ model: tags }],
  // });

  // Many to Many Tag to Post
  const data = await tags.findAll({
    include: [{ model: Posts }],
  });
  res.status(200).json(data);
};

module.exports = {
  addHardcodedUser,
  bulkAddHardcodedUser,
  findAllUsers,
  findFirstUser,
  getOnlyFewColumnsOfAll,
  excludeAndInclude,
  findQueries,
  getByGroupOrderLimit,
  getOneToOne,
  addData,
  manyOneToMany,
};
