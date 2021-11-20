"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Image, Video }) {
      // define association here
      // for One to Many PolyMorphic
      this.belongsTo(Image, { foreignKey: "asset_id", constraints: false });
      this.belongsTo(Video, { foreignKey: "asset_id", constraints: false });
    }
  }
  Comment.init(
    {
      comment: DataTypes.STRING,
      asset_id: DataTypes.INTEGER,
      asset_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comments",
    }
  );
  return Comment;
};
