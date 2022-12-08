'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'classes',
      'school_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'schools', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );
     
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'classes',
      'isAdmin'
    );
     
  }
};
