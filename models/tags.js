"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Posts, PostTags, Image, Video, ImageVideoTag }) {
      // define association here
      this.belongsToMany(Posts, {
        through: PostTags,
        foreignKey: "tag_id",
      });

      // for Many to Many PolyMorphic
      this.belongsToMany(Image, {
        through: {
          model: ImageVideoTag,
          unique: false,
          scope: {
            asset_type: "image",
          },
        },
        foreignKey: "tag_id",
        constraints: false,
      });
      // for Many to Many PolyMorphic
      this.belongsToMany(Video, {
        through: {
          model: ImageVideoTag,
          unique: false,
          scope: {
            asset_type: "video",
          },
        },
        foreignKey: "tag_id",
        constraints: false,
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
