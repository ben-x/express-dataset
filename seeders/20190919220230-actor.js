
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Actors', [{
    "login":"daniel33",
    "avatar_url":"https://avatars.com/2790311"
  }, {
    "login":"saniel33",
    "avatar_url":"https://avatars.com/2790311"
  }, {
    "login":"yaniel33",
    "avatar_url":"https://avatars.com/2790311"
  },
   {
    "login":"vaniel33",
    "avatar_url":"https://avatars.com/2790311"
  },
  ], {}),
  down: queryInterface => queryInterface.bulkDelete('Actors', null, {})
};
