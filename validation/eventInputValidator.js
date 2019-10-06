var eventInputValidator = (req, res, next) => {
    if (!req.body.id){
        res.status(401).send({ message: 'ID is required' })
    } else if (!req.body.name){
        res.status(401).send({ message: 'Repo Name is required' })
    } else if (!req.body.url){
        res.status(401).send({ message: 'Repo URL is required' })
    } else {
        return next();
    }
};

module.exports = { 
    eventInputValidator: eventInputValidator
}