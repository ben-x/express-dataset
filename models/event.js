'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    type: DataTypes.STRING,
    actorId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Actors',
        key: 'id',
        as: 'actorId'
      }
    },
    repoId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Repos',
        key: 'id',
        as: 'repoId'
      }
    }
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.Actor, {
      foreignKey: 'actorId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Event.belongsTo(models.Repo, {
      foreignKey: 'repoId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Event;
};