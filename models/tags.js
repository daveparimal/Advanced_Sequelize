"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Posts, PostTags }) {
      // define association here
      this.belongsToMany(Posts, {
        through: PostTags,
        foreignKey: "tag_id",
      });
    }
  }
  tags.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "tags",
      modelName: "tags",
    }
  );
  return tags;
};
