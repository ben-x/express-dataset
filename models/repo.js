'use strict';
module.exports = (sequelize, DataTypes) => {
  const Repo = sequelize.define('Repo', {
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  Repo.associate = function(models) {
    // associations can be defined here
    Repo.hasMany(models.Event, {
      foreignKey: 'repoId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Repo;
};