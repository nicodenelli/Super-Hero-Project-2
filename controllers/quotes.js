const character = require("../models/character");
const CharacterModel = require("../models/character");

module.exports = {
  create,
  delete: deleteQuote,
};

function deleteQuote(req, res){
	// tell the model to delete the character of the id 
	// req.params.id represents the id coming from the form on the client
	CharacterModel.deleteOne(req.params.id);
	res.redirect('/supers')
}

function create(req, res){
	console.log(req.body)
	// Use a Model to find the character with an id (req.params.id)
	CharacterModel.findById(req.params.id)
			   .then(function(characterDoc){

					console.log(characterDoc)
					// mutating a document, 
					// adding/or removing/updating 
					// something found from the database
					// characterDoc.quote.push(req.body);
					characterDoc.quote[0]=req.body;
					// save the document to tell mongodb I changed something, because this 
					// exists on my express server, mongodb doesn't know I added req.body
                    // to the characters quotes array
					characterDoc.save()
								 .then(function(){
									res.redirect(`/supers/${req.params.id}`)
								 })
					

						// Then with the character I found, I want to add a quote to the character's
                        // quotes array to create a quote

			   }).catch(err =>{
				console.log(err);
				res.send(err)
			   })

}