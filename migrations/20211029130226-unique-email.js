"use strict";
// Custom Migrations Demo
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize
      .query(
        `CREATE TABLE dupe_users AS (SELECT A.*
          FROM users A
          INNER JOIN
            (SELECT email,
                MIN(ID) AS ID
              FROM users
              GROUP BY email) AS B ON A.email = B.email
          AND A.ID = B.ID)`
      )
      .then(() => queryInterface.renameTable("users", "users_orig"))
      .then(() => {
        // to run as a transaction
        return Promise.all([
          queryInterface.renameTable("dupe_users", "users"),
          queryInterface.addConstraint("users", {
            fields: ["email"],
            type: "unique",
            allowNull: true,
            unique: true,
          }),
        ]);
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface
      .dropTable("users")
      .then(() => queryInterface.renameTable("users_orig", "users"));
  },
};
