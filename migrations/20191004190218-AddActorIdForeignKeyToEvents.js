"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Events", ["actorId"], {
      type: "foreign key",
      name: "fk_events_actors",
      references: {
        table: "Actors",
        field: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Events", "fk_events_actors");
  }
};
