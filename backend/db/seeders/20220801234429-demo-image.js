'use strict';


const testImages = [
  {
    url: "https://images.pexels.com/photos/8092380/pexels-photo-8092380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    previewImage: true,
    spotId: 1,

    userId: 1,
  },
  {
    url: "https://images.pexels.com/photos/8583869/pexels-photo-8583869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    previewImage: true,
    spotId: 2,

    userId: 1,
  },
  {
    url: "https://images.pexels.com/photos/2104139/pexels-photo-2104139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    previewImage: true,

    spotId: 3,
    userId: 1,
  },
  {
    url: "https://images.pexels.com/photos/8092385/pexels-photo-8092385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    previewImage: true,
    spotId: 4,
    userId: 1,
  },
  {
    url: "https://images.pexels.com/photos/7746560/pexels-photo-7746560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
    url: "https://images.pexels.com/photos/5997994/pexels-photo-5997994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
    url: "https://images.pexels.com/photos/7031594/pexels-photo-7031594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    previewImage: true,
    spotId: 9,
    userId: 1,
  },
  {
    url: "https://images.pexels.com/photos/2692254/pexels-photo-2692254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
