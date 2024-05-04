'use strict';

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
    */

    await queryInterface.bulkInsert('User',
      [
        {
          email: 'dmn@1',
          password: '123',
          username: 'daominhnhat1',
        },
        {
          email: 'dmn@2',
          password: '123',
          username: 'daominhnhat2',
        },
        {
          email: 'dmn@3',
          password: '123',
          username: 'daominhnhat3',
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
