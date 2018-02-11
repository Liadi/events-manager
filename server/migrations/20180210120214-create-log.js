'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      entityName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      entity: {
        type: Sequelize.ENUM('User', 'Center', 'Event'),
        allowNull: false,
      },
      entityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      action: {
        type: Sequelize.ENUM('POST', 'UPDATE', 'DELETE'),
        allowNull: false,
      },
      before: {
        allowNull: false,
        type: Sequelize.TEXT('long'),
      },
      after: {
        allowNull: false,
        type: Sequelize.TEXT('long'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Logs'),
};