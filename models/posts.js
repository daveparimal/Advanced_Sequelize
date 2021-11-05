"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // one to one
    // one to many
    static associate({ User, tags, PostTags }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id" });
      this.belongsToMany(tags, {
        through: PostTags,
        foreignKey: "post_id",
      });
    }
  }
  Posts.init(
    {
      name: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "posts",
      modelName: "Posts",
    }
  );
  return Posts;
};
