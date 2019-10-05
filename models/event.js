"use strict";
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define(
    "Event",
    {
      type: DataTypes.STRING
    },
    {}
  );
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.Actor, {as: 'actor'})
    Event.belongsTo(models.Repo, {as: 'repo'})


  };
  return Event;
};
