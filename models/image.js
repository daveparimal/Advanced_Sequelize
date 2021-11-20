"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comment, ImageVideoTag, tags }) {
      // define association here
      // for One to Many PolyMorphic
      this.hasMany(Comment, {
        foreignKey: "asset_id",
        constraints: false,
        scope: { asset_type: "image" },
      });

      // for Many to Many PolyMorphic
      this.belongsToMany(tags, {
        through: {
          model: ImageVideoTag,
          unique: false,
          scope: {
            asset_type: "image",
          },
        },
        foreignKey: "asset_id",
        constraints: false,
      });
    }
  }
  Image.init(
    {
      title: DataTypes.STRING,
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Image",
      tableName: "images",
    }
  );
  return Image;
};
