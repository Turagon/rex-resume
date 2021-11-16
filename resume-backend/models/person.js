'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  Person.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    language: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Person',
  });
  return Person;
};