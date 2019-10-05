"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex("Actors", ["login"], { unique: true });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex("Actors", ["login"]);
  }
};
