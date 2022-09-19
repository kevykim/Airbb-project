'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: "7151 Apple Lane",
        city: "Los Angeles",
        state: "California",
        country: "United States Of America",
        lat: 30.1405918,
        lng: -194.2930915,
        name: "Wanderlust, Spring Styled Cottage Home in Los Angeles",
        description:
          "Located only 30 minutes from Los Angeles is The Spring Styled Cottage Home. With its rustic charm and modern utility, it is a nice get away to venture in peace.",
        price: 500,
      },
      {
        ownerId: 1,
        address: "711 Peach Lane",
        city: "Pasadena",
        state: "California",
        country: "United States Of America",
        lat: 35.1245918,
        lng: -144.2435915,
        name: "Home Sweet Home, Modern Home in Pasadena",
        description:
          "Located in a quiet neighborhood within the city of Pasadena. Walking distance to many restaurants and stores nearby.",
        price: 600,
      },
      {
        ownerId: 1,
        address: "7131 Pear Lane",
        city: "Lake Arrowhead",
        state: "California",
        country: "United States Of America",
        lat: 40.1468718,
        lng: -170.2954915,
        name: "Modern-styled Home near the lakes of Lake Arrowhead.",
        description:
          "Nice modern-styled home near Lake Arrowhead. With a nice view of the lake and many activities near by such as fishing, camping, etc.",
        // previewImage:
        //   "https://images.unsplash.com/photo-1589129140837-67287c22521b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80",
        price: 700,
      },
      {
        ownerId: 1,
        address: "5149 Bridge Rd.",
        city: "Alhambra",
        state: "California",
        country: "United States Of America",
        lat: 59.190192,
        lng: 124.0192834,
        name: "Modern-styled home in the city of Alhambra",
        description: "18th century styled home that has modern utilities inside. Placed in a quiet neighborhood that has easy access to many stores nearby.",
        price: 350
      },
      {
        ownerId: 2,
        address: "7131 Brick Lane",
        city: "Big Bear",
        state: "California",
        country: "United States Of America",
        lat: 40.1469718,
        lng: -170.2654915,
        name: "Rustic Home up in the woods of Big Bear Mountain",
        description:
          "Nice cabin-styled home with many rooms and bathrooms for a nice snowboard/ski trip up in the woods.",
        price: 950,
      },
      {
        ownerId: 2,
        address: "7131 Ruby Road",
        city: "Arcadia",
        state: "California",
        country: "United States Of America",
        lat: 40.1465418,
        lng: -170.2651915,
        name: "Modern Home overlooking the city of Arcadia.",
        description:
          "Modern home with a great view of Arcadia on top of the San Gabriel Mountains. ",
        price: 950,
      },
      {
        ownerId: 2,
        address: "1049 Desert Ave",
        city: "Palm Springs",
        state: "California",
        country: "United States of America",
        lat: 10.1092834,
        lng: -192.2940182,
        name: "Rustic Cabin in the deserts of Palm Springs",
        description:
        "Rustic appearance that is furnished with modern utilities. Great for a nice get away from the city with only 20 minutes distance from casinos and a shopping center.",
        price: 500,
      },
      {
        ownerId: 2,
        address: "9810 Lake Rd",
        city: "Mammoth Lakes",
        state: "California",
        country: "United States of America",
        lat: 38.1983746,
        lng: -149.2983717,
        name: "Brown Concrete Styled House near Mammoth Lake",
        description: 
        "Lake side house near Mammoth Lake. A nice vacation house that for many activities for the summer and winter such as fishing, hiking, snowboarding, and more.",
        price: 650,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
   await queryInterface.bulkDelete('Spots', {ownerId: {[Op.in]: [1, 2, 3, 4] }} , {});
  }
};
