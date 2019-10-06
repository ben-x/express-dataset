const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const actorInputValidator = (req, res, next) => {
    if (!(req.body.email)) {
       res.status(400).send({ message: 'Email is required' });
    } else if(!(req.body.email).match(emailPattern)) {
       res.status(400).send({ message: 'Please use a valid email address' });
    } else if (!req.body.password) {
    res.status(400).send({ message: 'Password is required' });
    } else {
        return next();
    }
}

module.exports = {
    actorInputValidator: actorInputValidator
}