'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: "7151 Apple Lane",
        city: "Irvinea",
        state: "Californiac",
        country: "United States Of America",
        lat: 30.1405918,
        lng: -194.2930915,
        name: "Apple",
        description: "Very clean",
        price: 500,
      },
      {
        ownerId: 2,
        address: "711 Peach Lane",
        city: "Irvined",
        state: "Californiav",
        country: "United States Of America",
        lat: 35.1245918,
        lng: -144.2435915,
        name: "Peach",
        description: "Very spacious",
        price: 600,
      },
      {
        ownerId: 3,
        address: "7131 Pear Lane",
        city: "Irvineg",
        state: "Californiag",
        country: "United States Of America",
        lat: 40.1468718,
        lng: -170.2954915,
        name: "Pear",
        description: "Very nice",
        price: 700,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Spots', {} , {});
  }
};