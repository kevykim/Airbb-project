'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.hasMany(models.Image, {foreignKey: 'reviewId'});
      Review.belongsTo(models.User, {foreignKey: 'userId'});
      Review.belongsTo(models.Spot, {foreignKey: 'Spot'})
    }
  }
  Review.init({
    review: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    stars: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 1,
        max: 5
      }
    },
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    spotId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};