"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Posts }) {
      // define association here
      // one to one
      // this.hasOne(Posts, {
      //   foreignKey: "user_id",
      // });

      // one to many
      this.hasMany(Posts, {
        foreignKey: "user_id",
      });
    }
  }
  // setter and getters
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("name", value + "Setter Dave");
        },
      },
      email: {
        type: DataTypes.STRING,
        // constraints added later for creating customized migration file.
        allowNull: false,
        unique: true,
        get() {
          return this.getDataValue("email").toUpperCase() + " " + this.name;
        },
      },
      gender: {
        type: DataTypes.STRING,
        // validations added later for creating customized migration file.
        validate: {
          // equals: male,  // check if value equal to male,
          // equals: {      // If you want customzied error messages on failure or exception
          //   args:'male',
          //   message:"Please enter only male"
          // },
          isIn: [["male", "female"]], // check if value exists in the list
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
