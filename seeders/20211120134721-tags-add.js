"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *
     *
     */

    // seeder up
    await queryInterface.bulkInsert(
      "tags",
      [
        {
          name: "Test tag 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Test tag 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // seeder down
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      "tags",
      { name: { [Op.in]: ["Test tag 1", "Test tag 2"] } },
      {}
    );
  },
};
