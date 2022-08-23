'use strict';


const testImages = [
  {
    url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80",
    previewImage: true,
    spotId: 1,
    reviewId: 1,
    userId: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    previewImage: true,
    spotId: 2,
    reviewId: 2,
    userId: 2,
  },
  {
    url: "https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1104&q=80",
    previewImage: true,
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
