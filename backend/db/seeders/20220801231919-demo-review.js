'use strict';

const testReviews = [
  {
    review: "This place is wonderful.",
    stars: 4,
    userId: 1,
    spotId: 1,
  },
  {
    review: "Nice get away and calm.",
    stars: 4,
    userId: 2,
    spotId: 1,
  },
  {
    review: "Really enjoyed my stay here.",
    stars: 3,
    userId: 2,
    spotId: 2,
  },
  {
    review: "Nice catch and cook of local trout in the area.",
    stars: 4,
    userId: 2,
    spotId: 3,
  },
  {
    review: "Had a nice snowboard trip with friends and family.",
    stars: 4,
    userId: 1,
    spotId: 4,
  },
  {
    review: "Loved the snow and fresh air. ",
    stars: 5,
    userId: 2,
    spotId: 4,
  },
  {
    review: "Clean home with many rooms.",
    stars: 4,
    userId: 1,
    spotId: 5,
  },
  {
    review: "Enjoying the view. ",
    stars: 5,
    userId: 2,
    spotId: 6,
  },
  {
    review: "Enjoying the view. ",
    stars: 5,
    userId: 2,
    spotId: 7,
  },
  {
    review: "Enjoying the view. ",
    stars: 5,
    userId: 2,
    spotId: 8,
  },
  {
    review: "Enjoying the view. ",
    stars: 5,
    userId: 2,
    spotId: 9,
  },
  {
    review: "Enjoying the view. ",
    stars: 5,
    userId: 2,
    spotId: 10,
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Reviews", testReviews );
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", testReviews, {})
  }
};
