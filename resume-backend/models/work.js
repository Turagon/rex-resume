'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  Work.init({
    company: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    from: DataTypes.DATEONLY,
    to: DataTypes.DATEONLY,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    language: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Work',
  });
  return Work;
};