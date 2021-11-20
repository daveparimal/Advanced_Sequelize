"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImageVideoTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ImageVideoTag.init(
    {
      tag_id: DataTypes.INTEGER,
      asset_type: DataTypes.STRING,
      asset_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ImageVideoTag",
      tableName: "image_video_tags",
    }
  );
  return ImageVideoTag;
};
