// Database schema initialization
const
// Webserver, templating
	fileupload = require('express-fileupload'),
	express = require("express"),
	app = express(),
	hbs = require("express-handlebars").create({ defaultLayout: "main" }),
	port = process.env.PORT || 3000,

	// Body parser
	bodyParser = require('body-parser'),

	// Socket.io
	server = require('http').createServer(app),
	io = require('socket.io')(server),

	// Database, backend
	jsonDB = require("./jsonDB.js").db,
	database = require("./models/db.js")

;

//require("./models/db.js");

// App configuration
app.use(bodyParser.json())
app.use(express.json());
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(fileupload());

// Route definitions
app.get("/", (req, res) => {
	res.set("Content-Type", "text/html");
	res.render("landing", {isHome: true});

});

app.get("/rifts", (req, res) => {
	res.set("Content-Type", "text/html");
	res.render("rifts", { rifts: jsonDB });
});

app.get("/_/:riftName", (req, res) => {
	let thisRift;
	res.set("Content-Type", "text/html");
	if (jsonDB.find((e) => e.name == req.params.riftName)) {
		thisRift = jsonDB.find((e) => e.name == req.params.riftName);
		// console.log("found an entry: ", thisRift);
		res.render("detail", { rift: thisRift });
	} else {
		console.log(`didnt find entry: ${req.params.riftName}`);
		res.status(404);
		res.render("404", { invalidRift: true });
	}
});

app.get("/newRift", (req, res) => {
	res.render("newRift", {});
});

// Image upload handler
app.post('/saveImage', (req, res) => {
	const fileName = req.files.myFile.name
	const path = __dirname + '/public/img/banner/' + fileName
	const image = req.files.myFile

	image.mv(path, (error) => {
		if (error) {
			console.error(error)
			res.writeHead(500, {
				'Content-Type': 'application/json'
			})
			res.end(JSON.stringify({ status: 'error', message: error }))
			return
		}

		res.writeHead(200, {
			'Content-Type': 'application/json'
		})
		res.end(JSON.stringify({ status: 'success', path: '/img/banner/' + fileName }))
	})
})

// ************************
// ***Socket definitions***
// ************************
io.on('connection', (client) => {
	console.log('someone connected');
	client.on('create', (data) => {
		data.type = 'rift';
		console.log('--socket.io new data--');
		console.log(data);
		switch (data.type) {
			case 'rift':
				let newRiftObject = {
					owner: 69420,
					title: data.title,
					name: data.title,
					desc: data.desc,
					banner: `/img/banner/${data.title}.jpg`,
					roles: [],
					locale: "en_US",
					members: [69420]
				}
				database.riftCrud.create(newRiftObject);
				database.riftCrud.read(data.title);
				break;
			//case user, post, ...
			default:
				break;
		}
	});
});

server.listen(port, () => console.log(`listening on ${port}`));
