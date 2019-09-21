
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Repos', [{
    "name":"johnbolton/exercitationem",
    "url":"https://github.com/johnbolton/exercitationem"
  }, {
    "name":"johnbolton/exercitationem",
    "url":"https://github.com/johnbolton/exercitationem"
  }, {
    "name":"johnbolton/exercitationem",
    "url":"https://github.com/johnbolton/exercitationem"
  },
   {
    "name":"johnbolton/exercitationem",
    "url":"https://github.com/johnbolton/exercitationem"
  },
  ], {}),
  down: queryInterface => queryInterface.bulkDelete('Repos', null, {})
};
