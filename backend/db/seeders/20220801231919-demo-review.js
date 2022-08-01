'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Reviews", [
      {
        review: "This place is wonderful",
        stars: 4,
        userId: 1,
        spotId: 1,
      },
      {
        review: "This place is wonderful",
        stars: 2,
        userId: 2,
        spotId: 2,
      },
      {
        review: "This place is wonderful",
        stars: 5,
        userId: 3,
        spotId: 3,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", {}, {})
  }
};
