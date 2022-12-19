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
        description:
          "18th century styled home that has modern utilities inside. Placed in a quiet neighborhood that has easy access to many stores nearby.",
        price: 350,
      },
      {
        ownerId: 2,
        address: "7131 Brick Lane",
        city: "Buffalo",
        state: "New York",
        country: "United States Of America",
        lat: 40.1469718,
        lng: -170.2654915,
        name: "Rustic Home up in the woods",
        description:
          "Nice cabin-styled home with many rooms and bathrooms for a nice snowboard/ski trip up in the woods.",
        price: 950,
      },
      {
        ownerId: 2,
        address: "7131 Ruby Road",
        city: "Albany",
        state: "New York",
        country: "United States Of America",
        lat: 40.1465418,
        lng: -170.2651915,
        name: "Modern Home overlooking the city of Albany.",
        description:
          "Modern home with a great view of Arcadia on top of the Catskill Mountains. ",
        price: 950,
      },
      {
        ownerId: 2,
        address: "1049 Desert Ave",
        city: "New York City",
        state: "New York",
        country: "United States of America",
        lat: 10.1092834,
        lng: -192.2940182,
        name: "Modern Home in the outskirts of New York City",
        description:
          "Rustic appearance that is furnished with modern utilities. Great for a nice get away from the city with only 20 minutes distance from casinos and a shopping center.",
        price: 500,
      },
      {
        ownerId: 2,
        address: "9810 Lake Rd",
        city: "Rochester",
        state: "New York",
        country: "United States of America",
        lat: 38.1983746,
        lng: -149.2983717,
        name: "Brown Concrete Styled House near Lake Ontario",
        description:
          "Lake side house near Lake Ontario. A nice vacation house that for many activities for the summer and winter such as fishing, hiking, snowboarding, and more.",
        price: 650,
      },
      {
        ownerId: 1,
        address: "1827 Palo Rd",
        city: "Seatle",
        state: "Washington",
        country: "United States of America",
        lat: 20.0938183,
        lng: -114.2359102,
        name: "White and Brown Wooden Home in the city of Seatle",
        description:
          "19th century styled home with wonderful features such as a pool, gym, and more. In a quiet neighborhood, that is not too far from the city of Seatle.",
        price: 630,
      },
      {
        ownerId: 1,
        address: "1051 Dorothy Rd",
        city: "Bellevue",
        state: "Washington",
        country: "United States of America",
        lat: 28.2013947,
        lng: -103.3950293,
        name: "Gray bricked home in the city of Bellevue",
        description:
          "Rustic styled brick home with modern utilities inside. A nice home within a quiet neighborhood that is not too far from many outdoor activities.",
        price: 520,
      },
      {
        ownerId: 1,
        address: "1051 Courage Rd",
        city: "Vancouver",
        state: "Washington",
        country: "United States of America",
        lat: 28.2011947,
        lng: -103.6950293,
        name: "Gray bricked home in the city of Vancouver",
        description:
          "Rustic styled brick home with modern utilities inside. A nice home within a quiet neighborhood that is not too far from many outdoor activities.",
        price: 120,
      },
      {
        ownerId: 1,
        address: "1051 Bellow Rd",
        city: "Tacoma",
        state: "Washington",
        country: "United States of America",
        lat: 28.2073947,
        lng: -103.3950293,
        name: "Gray bricked home in the city of Tacomma",
        description:
          "Rustic styled brick home with modern utilities inside. A nice home within a quiet neighborhood that is not too far from many outdoor activities.",
        price: 340,
      },
      {
        ownerId: 2,
        address: "9810 Hollow Rd",
        city: "Dallas",
        state: "Texas",
        country: "United States of America",
        lat: 38.1983746,
        lng: -149.2983717,
        name: "Nice cozy apartment not too far from the city",
        description:
          "Apartment with full utilities that is furnished with 2 bedrooms and 1 bathroom.",
        price: 650,
      },
      {
        ownerId: 2,
        address: "9810 Green Rd",
        city: "Austin",
        state: "Texas",
        country: "United States of America",
        lat: 38.1983746,
        lng: -149.2983717,
        name: "Very spacious townhouse that is close to the city",
        description:
          "Only a 10 minute walk into the city of Austin with many restaurants nearby.",
        price: 650,
      },
      {
        ownerId: 2,
        address: "9810 Maple Rd",
        city: "Houston",
        state: "Texas",
        country: "United States of America",
        lat: 38.1983746,
        lng: -149.2983717,
        name: "Brown Concrete Styled House near Houston",
        description:
          "Old rustic home that is furnished with modern utilities. A nice get away that is only 20 minutes away from the city.",
        price: 650,
      },
      {
        ownerId: 2,
        address: "9810 Country Rd",
        city: "San Antonio",
        state: "Texas",
        country: "United States of America",
        lat: 38.1983746,
        lng: -149.2983717,
        name: "White cottage home in the area of San Antonio",
        description:
          "Recently finished home that is ready for rental usage. Please contact the owner if you have any questions.",
        price: 650,
      },
      {
        ownerId: 1,
        address: "5120 City Blvd",
        city: "Denver",
        state: "Colorado",
        country: "United States of America",
        lat: 28.1983746,
        lng: -119.2983717,
        name: "Country styled home near the city of Denver",
        description:
          "Rustic home near the mountains for many outdoor activites through out the year.",
        price: 300,
      },
      {
        ownerId: 1,
        address: "7182 Springs Rd",
        city: "Colorado Springs",
        state: "Colorado",
        country: "United States of America",
        lat: 28.1913746,
        lng: -119.2383717,
        name: "Two story home near the city of Colorado Springs",
        description: "Very spacious home with 5 bedrooms and three bathrooms.",
        price: 600,
      },
      {
        ownerId: 1,
        address: "7721 Rocky Blvd",
        city: "Boulder",
        state: "Colorado",
        country: "United States of America",
        lat: 28.1983746,
        lng: -119.2933717,
        name: "Brick home in the suburbs of Boulder",
        description:
          "Nice home in a quiet neighborhood that is not too far from the city.",
        price: 200,
      },
      {
        ownerId: 1,
        address: "5120 Water Blvd",
        city: "Aurora",
        state: "Colorado",
        country: "United States of America",
        lat: 28.1983146,
        lng: -119.2423717,
        name: "Country styled home near the city of Aurora",
        description:
          "Rustic home near the mountains for many outdoor activites through out the year.",
        price: 450,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
   await queryInterface.bulkDelete('Spots', {ownerId: {[Op.in]: [1, 2, 3, 4] }} , {});
  }
};
