const sortById = (collection) => {
    collection.sort((eventA, eventB) => {
        const eventAId = eventA._id.toLowerCase();
        const eventBId = eventB._id.toLowerCase();
        if (eventAId < eventBId) return -1;
        if (eventAId > eventBId) return 1;
        return 0;
    })
}

module.exports = {
    sortById: sortById
}