'use strict';


const testImages = [
  {
    url: "testing",
    previewImage: true,
    spotId: 1,
    reviewId: 1,
    userId: 1,
  },
  {
    url: "testweb",
    previewImage: true,
    spotId: 2,
    reviewId: 2,
    userId: 2,
  },
  {
    url: "testsite",
    previewImage: false,
    spotId: 3,
    reviewId: 3,
    userId: 3,
  },
  {
    url: "memory",
    previewImage: true,
    spotId: 4,
    reviewId: 4,
    userId: 4,
  },
  {
    url: "wonder",
    previewImage: true,
    spotId: 5,
    reviewId: 5,
    userId: 5,
  },
];


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Images", testImages);
     
      // {
      //   url: "creation",
      //   previewImage: true,
      //   spotId: 6,
      //   reviewId: 6,
      //   userId: 6,
      // },
      // {
      //   url: "apple",
      //   previewImage: true,
      //   spotId: 7,
      //   reviewId: 7,
      //   userId: 7,
      // },

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", {}, {});
  }
};
