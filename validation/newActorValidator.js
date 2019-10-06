const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const newActorValidator = (req, res, next) => {
    if (!(req.body.email)) {
        res.status(400).send({ message: 'Email is required' });
    } else if(!(req.body.email).match(emailPattern)) {
       res.status(400).send({ message: 'Please use a valid email address' });
    } else {
        return next();
    }
}

module.exports = {
    newActorValidator: newActorValidator
}