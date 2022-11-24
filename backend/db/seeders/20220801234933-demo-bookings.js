'use strict';

const testBookings = [
  {
    userId: 1,
    spotId: 5,
    startDate: new Date("2022-08-02"),
    endDate: new Date("2022-08-04"),
  },
  {
    userId: 2,
    spotId: 1,
    startDate: new Date("2022-08-05"),
    endDate: new Date("2022-08-07"),
  },
  {
    userId: 2,
    spotId: 2,
    startDate: new Date("2022-08-08"),
    endDate: new Date("2022-08-10"),
  },
  {
    userId: 1,
    spotId: 6,
    startDate: new Date("2022-09-08"),
    endDate: new Date ("2022-09-10"),
  },
  {
    userId: 1,
    spotId: 7,
    startDate: new Date("2022-10-08"),
    endDate: new Date ("2022-10-10"),
  },
  {
    userId: 2,
    spotId: 3,
    startDate: new Date("2022-10-08"),
    endDate: new Date ("2022-10-10"),
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("Bookings", testBookings);
  

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookings", testBookings, {});
  }
};
