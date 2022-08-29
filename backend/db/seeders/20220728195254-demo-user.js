'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert(
     "Users",
     [
       {
         firstName: "Bob",
         lastName: "Monroe",
         email: "demo@user.io",
         username: "Demo-lition",
         hashedPassword: bcrypt.hashSync("password"),
       },
       {
         firstName: "Zoe",
         lastName: "Apple",
         email: "user1@user.io",
         username: "FakeUser1",
         hashedPassword: bcrypt.hashSync("password2"),
       },
     ],
     {}
   );
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
   await queryInterface.bulkDelete(
     "Users",
     {
       username: {
         [Op.in]: ["Demo-lition", "FakeUser1"],
       },
     },
     {}
   );
  }
};
