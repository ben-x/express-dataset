"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Events", ["repoId"], {
      type: "foreign key",
      name: "fk_events_repos",
      references: {
        table: "Repos",
        field: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Events", "fk_events_repos");
  }
};
