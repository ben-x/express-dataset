module.exports = {
  up: (queryInterface: any, Sequelize: any) => {
    return queryInterface.createTable('Actors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      event_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Events',
          key: 'id',
          as: 'event_id',
        },
      },
      login: {
        type: Sequelize.STRING,
      },
      avatar_url: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('Actors');
  },
};
