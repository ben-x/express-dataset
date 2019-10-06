const sortByStreak = (collection) => {
        collection.sort((actorA, actorB) => {
            return actorB.streaks - actorA.streaks;
        }); 
};

module.exports = {
    sortByStreak: sortByStreak
}