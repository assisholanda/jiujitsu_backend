'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'schools',
      'user_id_teacher',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
      }
    );
     
  },

  down: async (queryInterface, Sequelize) => {
     
  }
};

