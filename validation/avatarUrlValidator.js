const avatarUrlValidator = (req, res, next) => {
    if(!req.body.avatar_url) {
        res.status(400).send({ message: 'Avatar Url is required' });
    } else {
        return next();
    }
}

module.exports = {
    avatarUrlValidator: avatarUrlValidator
}
