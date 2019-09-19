
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Events', [{
    "type": "PushEvent",
    "actorId": 1,
    "repoId": 1,
  }, {
    "type": "PushEvent",
    "actorId": 2,
    "repoId": 2,
  }, {
    "type": "PushEvent",
    "actorId": 3,
    "repoId": 3,
  },
  {
    "type": "PushEvent",
    "actorId": 4,
    "repoId": 4,
  },
  ], {}),
  down: queryInterface => queryInterface.bulkDelete('Events', null, {})
};
