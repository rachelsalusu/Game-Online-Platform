'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('GameDetails', [
      {
        user_id: 1,
        game_id: 1,
        score: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        game_id: 1,
        score: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('GameDetails', null, {});
  },
};
