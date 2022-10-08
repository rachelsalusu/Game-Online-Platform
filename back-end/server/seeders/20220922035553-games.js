"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Games', [
      {
        name: 'Rock Paper Scissors',
        desc: "Rock paper scissors is a hand game originating from China, usually played between two people, in which each player simultaneously forms one of three shapes with an outstretched hand. These shapes are 'rock', 'paper', and 'scissors'",
        thumbnail_url:
          'https://i.pinimg.com/originals/79/34/c6/7934c6cf66ceade7c2986687946067b2.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pig',
        desc: 'Pig is a simple dice game first described in print in John Scarne in 1945.[1] Players take turns to roll a single die as many times as they wish, adding all roll results to a running total, but losing their gained score for the turn if they roll a 1',
        thumbnail_url:
          'https://play-lh.googleusercontent.com/Zi5gj_jv55wWlWd_v5WjeVhHdRaltPW_4ImWhBx5NSGINcsOm5iMSP9UWLHwkAl7EyrS=w240-h480-rw',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Games', null, {});
  },
};
