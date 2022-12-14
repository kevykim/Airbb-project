'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Images", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      previewImage: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      // bookingId: {
      //   type: Sequelize.INTEGER
      // },
      spotId: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        // references: { model: "Spots" },
        // onDelete: 'CASCADE'
      },
      reviewId: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        // references: { model: "Reviews" },
        // onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: { model: "Users" },
        // onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images');
  }
};