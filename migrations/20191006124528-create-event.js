'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      actor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Actors',
          key: 'id',
          as: 'actor'
        }
      },
      repo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Repos',
          key: 'id',
          as: 'repo'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};