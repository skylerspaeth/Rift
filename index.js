const 
  express = require('express'),
  app = express(),
  hbs = require('express-handlebars').create({ defaultLayout: 'main' }),
  port = 3000,
  { db } = require('./db.js')
;
let thisRift;

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
  res.render('rifts', { rifts: db } );
});

app.get('/_/:riftName', (req, res) => {
  res.set('Content-Type', 'text/html');
  if (db.find((e) => e.name == req.params.riftName)) {
    thisRift = db.find((e) => e.name == req.params.riftName);
    console.log('found an entry: ', thisRift);
    res.render('detail', { rift: thisRift } );
  } else {
    console.log('didnt find an entry');
    res.status(404);
    res.render('404', { invalidRift: true });
  }
});


app.listen(port, () => console.log(`listening on ${port}`))
