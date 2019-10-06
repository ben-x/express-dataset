'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    actor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    },
    repo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    },
  }, {});
  Event.associate = (models) => {
    Event.belongsToMany(models.Actor, {
      foreignKey: 'actor',
      target: 'id',
      onDelete: 'CASCADE'
    });
    Event.belongsToMany(models.Repo, {
      foreignKey: 'repo',
      target: 'id',
      onDelete: 'CASCADE'
    });
  };
  return Event;
};