'use strict';


const testImages = [
  {
    url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80",
    previewImage: true,
    spotId: 1,

    userId: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    previewImage: true,
    spotId: 2,

    userId: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1104&q=80",
    previewImage: true,

    spotId: 3,
    userId: 1,
  },
  {
    url: "https://images.pexels.com/photos/259685/pexels-photo-259685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    previewImage: true,
    spotId: 4,
    userId: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1589129140837-67287c22521b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80",
    previewImage: true,

    spotId: 5,
    userId: 2,
  },
  {
    url: "https://www.precisioncraft.com/log-homes-blog/wp-content/uploads/2017/04/timber-home-utah-1020x554.jpg",
    previewImage: true,

    spotId: 6,
    userId: 2,
  },
  {
    url: "https://images.pexels.com/photos/2183521/pexels-photo-2183521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    previewImage: true,

    spotId: 7,
    userId: 2,
  },
  {
    url: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    previewImage: true,

    spotId: 8,
    userId: 2,
  },
  {
    url: "https://images.pexels.com/photos/343240/pexels-photo-343240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    previewImage: true,
    spotId: 9,
    userId: 1,
  },
  {
    url: "https://images.pexels.com/photos/448360/pexels-photo-448360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    previewImage: true,
    spotId: 10,
    userId: 1,
  },
];


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Images", testImages);
     

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", {}, {});
  }
};
