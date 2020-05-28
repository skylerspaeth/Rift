const 
	// Webserver, templating
  	express = require('express'),
  	app = express(),
  	hbs = require('express-handlebars').create({ defaultLayout: 'main' }),
  	port = 3000,

	// Database, backend
  	{ jsonDB } = require('./db.js'),
	{ url, dbName } = require('./private.json'),
	assert = require('assert'),
  	{ MongoClient } = require('mongodb'),
	client = new MongoClient(url, { useUnifiedTopology: true })
;

let thisRift;

client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);


  client.close();
});


class Post {
	constructor(author, context, content) {
		this.author = author;
		this.context = context;
		this.content = content;
	}
}

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.render('landing');
});

app.get('/rifts', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.render('rifts', { rifts: jsonDB } );
});

app.get('/_/:riftName', (req, res) => {
  res.set('Content-Type', 'text/html');
  if (jsonDB.find((e) => e.name == req.params.riftName)) {
    thisRift = jsonDB.find((e) => e.name == req.params.riftName);
    console.log('found an entry: ', thisRift);
    res.render('detail', { rift: thisRift } );
  } else {
    console.log('didnt find an entry');
    res.status(404);
    res.render('404', { invalidRift: true });
  }
});


app.listen(port, () => console.log(`listening on ${port}`))
