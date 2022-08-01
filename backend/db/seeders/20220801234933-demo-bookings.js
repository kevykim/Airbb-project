'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("Bookings", [
     {
       spotId: 1,
       userId: 1,
       startDate: "2022-08-02",
       endDate: "2022-08-04",
     },
     {
       spotId: 2,
       userId: 2,
       startDate: "2022-08-05",
       endDate: "2022-08-07",
     },
     {
       spotId: 3,
       userId: 3,
       startDate: "2022-08-08",
       endDate: "2022-08-10",
     },
   ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookings", {}, {});
  }
};
