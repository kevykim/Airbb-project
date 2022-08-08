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
  // {
  //   url: "memory",
  //   previewImage: true,
  //   spotId: 4,
  //   reviewId: 4,
  //   userId: 4,
  // },


];


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Images", testImages);
     

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", {}, {});
  }
};
