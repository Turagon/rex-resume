'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  Education.init({
    name: DataTypes.STRING,
    major: DataTypes.STRING,
    degree: DataTypes.STRING,
    from: DataTypes.DATEONLY,
    to: DataTypes.DATEONLY,
    location: DataTypes.STRING,
    language: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Education',
  });
  return Education;
};