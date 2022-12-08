'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(199),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(99),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(199),
        allowNull: true,
      },
      number: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      complement: {
        type: Sequelize.STRING(199),
        allowNull: true,
      },
      district: {
        type: Sequelize.STRING(199),
        allowNull: true,
      },
      password_hash: {
        type: Sequelize.STRING(299),
        allowNull: false,
      },
      birth_date: {
        type: Sequelize.STRING(99),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING(99),
        allowNull: true,
      },
      initial_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      number_graus: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      type_users_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'type_users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },  
      belt_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'belts', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, 
      school_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'schools', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'status_users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }  
    });
     
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
     
  }
};
