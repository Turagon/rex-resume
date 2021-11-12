'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // association
    }
  };
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: 'English'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};