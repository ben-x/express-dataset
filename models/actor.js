'use strict';
module.exports = (sequelize, DataTypes) => {
  const Actor = sequelize.define('Actor', {
    login: DataTypes.STRING,
    avatar_url: DataTypes.STRING
  }, {});
  Actor.associate = function(models) {
    // associations can be defined here
    Actor.hasMany(models.Event, {
      foreignKey: 'actorId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Actor;
};