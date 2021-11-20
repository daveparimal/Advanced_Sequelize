const {
  User,
  sequelize,
  Posts,
  tags,
  PostTags,
  Image,
  Video,
  Comment,
  ImageVideoTag,
} = require("../models");
const { Op, QueryTypes } = require("sequelize");

const addHardcodedUser = async (req, res) => {
  const data = await User.create({
    name: "Parimal Dave 9",
    email: "parimal9@gmail.com",
    gender: "female",
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
  const data = await User.findAll();
  // raw query example
  // const data = await sequelize.query("SELECT * from users");
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
  // const data = await tags.bulkCreate([
  //   {
  //     name: "Football",
  //   },
  //   {
  //     name: "Article",
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

// scopes example
const Scope = async (req, res) => {
  const data = await User.scope(["genderFilter"]).findAll();
  res.status(200).json(data);
};

const oneToManyPolymorphic = async (req, res) => {
  // const image = await Image.bulkCreate([
  //   {
  //     title: "Image 1",
  //     image_url: "Image 1 URL",
  //   },
  //   {
  //     title: "Image 2",
  //     image_url: "Image 2 URL",
  //   },
  // ]);
  // const video = await Video.bulkCreate([
  //   {
  //     title: "Video 1",
  //     video_url: "Video 1 URL",
  //   },
  //   {
  //     title: "Video 2",
  //     video_url: "Video 2 URL",
  //   },
  // ]);
  // const comment = await Comment.bulkCreate([
  //   {
  //     comment: "Image 1 is good",
  //     asset_id: "1",
  //     asset_type: "image",
  //   },
  //   {
  //     comment: "Image 2 is good",
  //     asset_id: "2",
  //     asset_type: "image",
  //   },
  //   {
  //     comment: "Video 1 is good",
  //     asset_id: "1",
  //     asset_type: "video",
  //   },
  //   {
  //     comment: "Video 2 is good",
  //     asset_id: "2",
  //     asset_type: "video",
  //   },
  // ]);
  // res.status(200).json({...image, ...video, ...comment});
};

// for One to Many PolyMorphic
const readOneToManyPolymorphic = async (req, res) => {
  // Image to Comment
  // const data = await Image.findAll({
  //   include: [
  //     {
  //       model: Comment,
  //     },
  //   ],
  // });

  // Video to Comment
  // const data = await Video.findAll({
  //   include: [
  //     {
  //       model: Comment,
  //     },
  //   ],
  // });

  // Comment to video/image
  const data = await Comment.findAll({
    include: [Image, Video],
  });
  res.status(200).json(data);
};

const addImageVideoTagData = async (req, res) => {
  // const data = await ImageVideoTag.bulkCreate([
  //   {
  //     tag_id: 1,
  //     asset_type: "image",
  //     asset_id: 1,
  //   },
  //   {
  //     tag_id: 2,
  //     asset_type: "image",
  //     asset_id: 1,
  //   },
  //   {
  //     tag_id: 3,
  //     asset_type: "image",
  //     asset_id: 2,
  //   },
  //   {
  //     tag_id: 4,
  //     asset_type: "video",
  //     asset_id: 1,
  //   },
  //   {
  //     tag_id: 7,
  //     asset_type: "video",
  //     asset_id: 2,
  //   },
  //   {
  //     tag_id: 8,
  //     asset_type: "video",
  //     asset_id: 2,
  //   },
  // ]);
  // res.status(200).json(data);
};

// for Many to Many PolyMorphic
const readManyToManyPolymorphic = async (req, res) => {
  // Image to Tag
  // const data = await Image.findAll({
  //   include: [tags],
  // });
  // Video to Tag
  // const data = await Video.findAll({
  //   include: [tags],
  // });
  // Tag to Image/video
  const data = await tags.findAll({
    include: [Image, Video],
  });
  // lazy loading
  // const data = await User.findOne({ where: { id: 1 } });
  // const posts = await data.getPosts();
  // const response = {
  //   user: data,
  //   posts: posts,
  // };
  // eager loading
  // const data = await User.findOne({ where: { id: 1 }, include: [Posts] });
  // res.status(200).json(data);
};

// transaction examples
const transactionsExample = async (req, res) => {
  // To make this example work,
  // read operation (findOne) is working fine
  // But for create there already exists a user with same email id so it will fail
  // so entire transaction will roll back.
  // this example is still not perfect since the error is not going in the catch block
  // its giving validation error in console.
  // still roll back and transaction id could be seen in the logs
  try {
    const response = sequelize.transaction(async () => {
      await User.findOne({ where: { id: 100 } });
      const user = await User.create({
        id: 5,
        name: "Parimal Dave 10",
        email: "parimal10@gmail.com",
        gender: "male",
      });
      return user;
    });
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      errors: err,
    });
  }
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
  Scope,
  oneToManyPolymorphic,
  readOneToManyPolymorphic,
  addImageVideoTagData,
  readManyToManyPolymorphic,
  transactionsExample,
};
