'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'rex',
      password: bcrypt.hashSync('1234', bcrypt.genSaltSync(10), null),
      role: 'admin',
      isActive: true,
      language: 'Chinese',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'turagon',
      password: bcrypt.hashSync('1234', bcrypt.genSaltSync(10), null),
      role: 'user',
      isActive: true,
      language: 'Chinese',
      createdAt: new Date(),
      updatedAt: new Date()
      }, {
        name: 'tangle',
        password: bcrypt.hashSync('1234', bcrypt.genSaltSync(10), null),
        role: 'user',
        isActive: true,
        language: 'English',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
