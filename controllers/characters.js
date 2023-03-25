//model is always capitalized, in every language
const CharacterModel = require('../models/character');

module.exports = {
	new: newCharacter,
	create,
	index
}










function index(req, res){

	CharacterModel.find({})
			   .then(function(allCharacters){

				console.log(allCharacters, " <_ data from the db")
				
				res.render('characters/index', {character: allCharacters})
			  }).catch(function(err){
				console.log(err);
				res.send(err)
			  })

	
}


function create(req, res){
    console.log(req.body, " <- contents of the form, req.body");
    CharacterModel.create(req.body)
               .then(function(characterCreatedInDb){
                console.log(characterCreatedInDb, " <- character document")
                res.redirect('/characters')
               }).catch((err) => {
                console.log(err);
                res.send('There was an error check the terminal, or log the err object')
               })
    
}

function newCharacter(req, res){


	// Render looks in the views folder
	res.render('characters/new')
}