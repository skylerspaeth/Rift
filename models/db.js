const mongoose = require('mongoose');
const dbName = "riftDB";
mongoose.connect('mongodb://localhost:27017/riftDB', { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
	if (!err) { console.log(`connection to mongoDB ${dbName} succeeded`) }
	else { console.log(`Error connecting to mongoDB ${err}`) }
});
