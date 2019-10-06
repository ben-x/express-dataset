'use strict';
module.exports = (sequelize, DataTypes) => {
  const Repo = sequelize.define('Repo', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
  }, {});
  Repo.associate = (models) => {
    Repo.hasMany(models.Event, {
      foreignKey: 'repo',
      target: 'id',
      onDelete: 'CASCADE'
    });
  };
  return Repo;
};