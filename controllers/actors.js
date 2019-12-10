const db = require('../database/database');

const getAllActors = async(req, res, next) => {
	var sql = `SELECT * FROM events GROUP BY actorID ORDER BY id, created_at DESC, login`;
	await db.each(sql, [], (err, result)=>{
		if(err){
			throw err
		}
		return res.status(200).json({result})
	})
	next();
};

const updateActor =async (req, res, next) => {

	var sql = `UPDATE events SET avatar_url = ? WHERE actorID = 'req.params.actor.id'`;

	let avatar_url = req.params.actor.avatar_url;
	let params = [avatar_url];

	if (params.length >1){
		return res.status(400).json({
			message: "You cannot update more than one field (avatar_url)"
		})
	}else{
		await db.get(Serialize((`SELECT avatar_url FROM events WHERE actorID = 'req.params.actor.id'`), [], (err, row)=>{
			if (err){
				throw err
			}
			return row ?/**if actorId is valid, update avatar_url */
			db.run(sql, [avatar_url], (err)=>{
				if(err){
					throw err;
				}
				res.status(200).json({
					message: "Avatar_url Updated Successfully"
				})
			})
			 : /**else return 404 status code */
			 res.status(404).json({
				 message: 'ActorID does not exist'
			 })
		}))
	}


	
	
	next();

};

const getStreak = async(req, res, next) => {
	var sql = `SELECT MAX(COUNT (*)) FROM events ORDER BY TIMESTAMP DESC, login `;
	await db.run(sql, [], (err, result)=>{
		if(err){
			throw err
		}
		return res.status(200).json({
			result
		})
	})
	next();

};


module.exports = {
	updateActor,
	getAllActors,
	getStreak
};// ES6 object model















