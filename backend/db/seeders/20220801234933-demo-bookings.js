'use strict';

const testBookings = [
  {
    spotId: 1,
    userId: 1,
    startDate: new Date("2022-08-02"),
    endDate: new Date("2022-08-04"),
  },
  {
    spotId: 2,
    userId: 2,
    startDate: new Date("2022-08-05"),
    endDate: new Date("2022-08-07"),
  },
  {
    spotId: 3,
    userId: 2,
    startDate: new Date("2022-08-08"),
    endDate: new Date("2022-08-10"),
  },
  // {
  //   spotId: 3,
  //   userId: 2,
  //   startDate: new Date("2022-09-08"),
  //   endDate: new Date ("2022-09-10"),
  // },
  // {
  //   spotId: 4,
  //   userId: 2,
  //   startDate: new Date("2022-10-08"),
  //   endDate: new Date ("2022-10-10"),
  // },
  // }
  //   spotId: 5,
  //   userId: 2,
  //   startDate: new Date("2022-10-08"),
  //   endDate: new Date ("2022-10-10"),
  // },
];

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("Bookings", testBookings);
  

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookings", testBookings, {});
  }
};
