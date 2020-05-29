const mongoose = require('mongoose');

var postSchema = new mongoose.Schema((
	owner: {
		type: Integer
	},
	title: {
		type: String
	},
	content: {
		type: String
	},
	edited: {
		state: { type: Date }
	},

));

mongoose.model('Rift', riftSchema);
