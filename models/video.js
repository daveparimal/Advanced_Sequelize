"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comment, tags, ImageVideoTag }) {
      // define association here
      // for One to Many PolyMorphic
      this.hasMany(Comment, {
        foreignKey: "asset_id",
        constraints: false,
        scope: {
          // for One to Many PolyMorphic
          asset_type: "video",
        },
      });

      // for Many to Many PolyMorphic
      this.belongsToMany(tags, {
        through: {
          model: ImageVideoTag,
          unique: false,
          scope: {
            asset_type: "video",
          },
        },
        foreignKey: "asset_id",
        constraints: false,
      });
    }
  }
  Video.init(
    {
      title: DataTypes.STRING,
      video_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Video",
      tableName: "videos",
    }
  );
  return Video;
};
