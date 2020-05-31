const mongoose = require('mongoose');
const dbName = "riftDB";
mongoose.connect('mongodb://localhost:27017/riftDB', { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
	if (!err) { console.log(`connection to mongoDB ${dbName} succeeded`) }
	else { console.log(`Error connecting to mongoDB ${err}`) }
});

const
	save = (object) => {
		object.save((err, doc) => {
			if (!err) {
				console.log("no error");
			} else {
				if (err.name == "ValidationError") {
					handleValidationError(err, req.body);
					res.end("rip you got a DB error");
					// ***FIX THIS BEFORE PROD***
					// IMPORTANT
					// YOU NEED MORE CODE HERE BRUH
				}
			}
		});
	},
	insert = (type, req, res) => {
		switch (type) {
			case rift:
				var riftToAdd = new Rift();
				riftToAdd.owner = req.body.newOwner;
				riftToAdd.owner_id = req.body.owner_id;
				riftToAdd.locale = req.body.locale;
				riftToAdd.title = req.body.newTitle;
				riftToAdd.name = req.body.newName;
				riftToAdd.desc = req.body.newDesc;
				riftToAdd.banner = req.body.newBanner;
				riftToAdd.icon = req.body.newIcon;
				riftToAdd.creationDate = this.creationDate;

				console.log("new rift created");
				break;
			case user:
				console.log("new user created");
				break;
			case post:
				var postToAdd = new Post();
				postToAdd.owner = req.body.newOwner;
				postToAdd.title = req.body.newContent;
				postToAdd.edited = req.body.edited;
				postToAdd.time;
				console.log("new post created");
				break;
			default:
				console.log("invalid DB insertion type");
				break;
		}
	}
	;