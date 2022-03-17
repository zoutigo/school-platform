'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presincription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Presincription.init({
    childFirstname: DataTypes.STRING,
    childLastname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Presincription',
  });
  return Presincription;
};