'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const Actor = sequelize.define('Actor', {
    loginId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: { isUUID: 4 }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    }
  }, {});

  Actor.beforeCreate(async (newUser) => {
    newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10));
  });

  Actor.associate = (models) => {
    Actor.hasMany(models.Event, {
      foreignKey: 'actor',
      target: 'id',
      onDelete: 'CASCADE'
    });
  };
  return Actor;
};