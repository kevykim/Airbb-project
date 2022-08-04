'use strict';

const testReviews = [
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
  {
    review: "This place is wonderful",
    stars: 5,
    userId: 4,
    spotId: 4,
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Reviews", testReviews );
    
      // {
      //   review: "This place is wonderful",
      //   stars: 5,
      //   userId: 5,
      //   spotId: 5,
      // },
      // {
      //   review: "This place is wonderful",
      //   stars: 5,
      //   userId: 6,
      //   spotId: 6,
      // },
      // {
      //   review: "This place is wonderful",
      //   stars: 5,
      //   userId: 7,
      //   spotId: 7,
      // },
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", testReviews, {})
  }
};
