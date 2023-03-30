//model is always capitalized, in every language
const CharacterModel = require('../models/character');

module.exports = {
	new: newCharacter,
	create,
	index,
    show,
	edit,
	update
}

async function update(req, res) {
	try {
		await CharacterModel.findByIdAndUpdate(req.params.id, req.body)
			
		return res.redirect(`/supers/${req.params.id}`);
	
	} catch (err) {
		console.log(err, "<-- this is the update err");
		return res.redirect('/supers');
	}
}

async function edit(req, res) {
	const char = await CharacterModel.findOne({_id: req.params.id});
	console.log(char);
	if (!char) return res.redirect('/supers');
	res.render('characters/edit', { char });
}


function show(req, res) {
	
	CharacterModel.findById(req.params.id)
			   .then(function(characterDoc) {
			   console.log(characterDoc)
			   res.render('characters/show', {character: characterDoc})
			   })
}


function index(req, res){

	CharacterModel.find({})
			   .then(function(allCharacters){

				console.log(allCharacters, " <_ data from the db")
				
				res.render('characters/index', {characters: allCharacters})
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
                res.redirect('/supers')
               }).catch((err) => {
                console.log(err);
                res.send('There was an error check the terminal, or log the err object')
               })
    
}

function newCharacter(req, res){


	// Render looks in the views folder
	res.render('characters/new')
}