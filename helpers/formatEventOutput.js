const formateventOutput = (result) => {
  const events = [];

  result.forEach((record) => {
    let event = {};
    let actor = {};
    let repo = {};

    actor.id = record.actor_id;
    actor.login = record.login;
    actor.avatar_url = record.avatar_url;

    repo.id = record.repo_id;
    repo.name = record.name;
    repo.url = record.url;

    event.id = record.id;
    event.type = record.type;
    event.actor = actor;
    event.repo = repo;
    event.created_at = record.created_at;

    events.push(event);
  });

  return events;
};

module.exports = formateventOutput;
