'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'});
      Spot.belongsToMany(models.User, {through: models.Booking});
      Spot.belongsToMany(models.User, {through: models.Image});
      Spot.belongsToMany(models.User, {through: models.Review});
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: true,
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlpha: true,
          capitlized(value) {
            if (value[0] !== value[0].toUpperCase()) {
              throw new Error("Must be capitalized");
            }
          },
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlpha: true,
          len: [2, 2],
          isUppercase: true,
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlpha: true,
          capitlized(value) {
            if (value[0] !== value[0].toUpperCase()) {
              throw new Error("Must be capitalized");
            }
          },
        },
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: true,
        validate: {
          isDecimal: true,
        },
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: true,
        validate: {
          isDecimal: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlpha: true
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true
        }
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};