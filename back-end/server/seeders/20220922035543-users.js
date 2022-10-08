'use strict';
const { hashPassword } = require('../utils/passwordHandler');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'PussySlayer613',
        email: 'pussy.slay3r@gmail.com',
        password: await hashPassword('youknownothing'),
        name: 'pussy',
        desc: 'coba',
        address: 'jakarta',
        sosmed_url: 'url',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'HardcoreLevellingWarrior',
        email: 'hclw@gmail.com',
        password: await hashPassword('youknownothing'),
        name: 'hard',
        desc: 'coba',
        address: 'jakarta',
        sosmed_url: 'url',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
