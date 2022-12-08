'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'schools',
      'user_id_teacher',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );
     
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'schools',
      'user_id_teacher'
    );
     
  }
};
