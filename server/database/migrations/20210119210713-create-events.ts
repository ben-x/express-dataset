module.exports = {
  up: (queryInterface: any, Sequelize: any) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      type: {
        type: Sequelize.STRING,
      },
      actor_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Actors',
          key: 'id',
          as: 'actor_id',
        },
      },
      repo_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Repos',
          key: 'id',
          as: 'repo_id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface: any) => {
    return queryInterface.dropTable('Events');
  },
};
