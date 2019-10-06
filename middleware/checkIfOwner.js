const checkIfOwner = (req, res, next) => {
    if(req.params.id !== req.user.userId) {
        res.status(401).send({ message: 'You can only update your own profile' });
    } else {
        return next();
    }
}

module.exports = {
    checkIfOwner: checkIfOwner
}