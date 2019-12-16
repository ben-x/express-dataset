const db = require('../database/database')

//use const instead of var (ES6)
const getAllEvents = async (req, res, next) => {

	var sql = `SELECT * FROM events ORDER BY id ASC`

	await db.each(sql, [], (err, result)=>{
		if (err){
			console.error(err.message)
		}
		return res.status(200).json(result)
	})
	next();
};

const addEvent = async (req, res, next)=>{


		var sql = "SELECT * FROM events WHERE id= ?";

		const eventID = 'req.params.id';
		const time = new Date();

		await db.each(sql, [eventID], (err, row)=>{
			if(err){
				return console.error(err.message);
			} 
			return row ? res.status(400).json({ 
				message : "EventID already exist"
			}) /*eventID already exist*/ :
			 
			/** Else add Event to database */
			await db.run( `INSERT INTO events (id, type, actorID, login, avatar_url, repoID, name, url, updated_at)
			 VALUES(?), ['req.body.id', 'req.body.type', 'req.body.actor.id',
			'req.body.actor.login', 'req.body.actor.avatar_url', 'req.body.repo.id', 'req.body.repo.name',
			'req.body.repo.url', 'time']`, (err)=>{
				if(err){
					return res.status(404).json({
						error: err.message
					})
				}
				return res.status(201).json({
					message: "Event created successfully"
				})
			} )
			

		}
		)


				
			  next();
		
		
	};


const getByActor = async (req, res, next) => {
	var sql = `SELECT * FROM events WHERE actorID = ? ORDER BY id ASC`;
	let actor = req.params.actor.id;

	await db.each(sql, [actor], (err, result)=>{
		if (err){
			console.error(err.message)
		}
		return result ? res.status(200).json(result) :

		res.status(404).json({
			message: `${actor} does not exist`
		})
	})
	next();

};


var eraseEvents = async(req, res, next) => {
	var sql = `DROP TABLE [IF EXISTS] events`;
	await db.run(sql, [], (err)=>{
		if (err){
			throw err;
		}
		return res.status(200).json({
			message: "ALL EVENTS HAVE BEEN DELETED SUCCESSFULLY"
		})
	})
		next();

};

// since objects have the same key and values, we will write only one form of it
module.exports = {
	getAllEvents,
	addEvent,
	getByActor,
	eraseEvents
};

















