const sortByEventCount = (collection) => {
    collection.sort(function(actorA, actorB) {
        return actorB.events - actorA.events;
    });
}

module.exports = {
    sortByEventCount: sortByEventCount
}