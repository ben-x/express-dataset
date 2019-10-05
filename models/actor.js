"use strict";
module.exports = (sequelize, DataTypes) => {
  var Actor = sequelize.define(
    "Actor",
    {
      login: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Login ID already exists!"
        }
      },
      avatar_url: DataTypes.STRING
    },
    {}
  );
  Actor.associate = function(models) {
    // associations can be defined here
    Actor.hasMany(models.Event, {as: 'actor'});
  };
  return Actor;
};
