
const CharacterModel = require("../models/character");

module.exports = {
  create,
  delete: deleteQuote,
};

function deleteQuote(req, res){
	// tell the model to delete the quote of the id 
	// req.params.id represents the id coming from the form on the client
	CharacterModel.findOne({
		"quote._id": req.params.id,
		"quote.userId": req.user._id,
	  }).then(function (characterDoc) {
		console.log(characterDoc, "<-- this is character doc")
		// if we don't find a match, characterDoc would be undefined
		if(!characterDoc) return res.redirect('/supers');
	
		// remove is method on mongoose subdocuments
		// quote is a subdocument
		// its embedded in the characters, One character has many quotes
		characterDoc.quote.remove(req.params.id);  // <- mutated a document!
		// mongodb doesn't know I removed the quote, 
		// so I have to call save on the characterDoc to tell mongodb
		// go back to the character change where the delete quote form was
		characterDoc.save().then(function(){
			res.redirect(`/supers/${characterDoc._id}`); 
		})
	
	
	  }).catch(err => {
		res.send(err)
	  })
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
					console.log(req.body, "<--this is req.body")
					req.body.userId = req.user._id;
					console.log(req.body, "<--this is req.body")
					characterDoc.quote.push(req.body);
					// characterDoc.quote[0]=req.body;
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