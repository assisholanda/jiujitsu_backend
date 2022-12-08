'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      }
    );
     
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'users',
      'email'
    );
     
  }
};
