'use strict';
module.exports = (sequelize, DataTypes) => {
  var Repo = sequelize.define('Repo', {
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  Repo.associate = function(models) {
    // associations can be defined here
    Repo.hasOne(models.Event, {as: 'repo'});


  };
  return Repo;
};