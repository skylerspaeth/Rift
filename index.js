// Database schema initialization
const
	// Webserver, templating
	fileupload = require('express-fileupload'),
	express = require("express"),
	app = express(),
	hbs = require("express-handlebars").create({ defaultLayout: "main" }),
	port = process.env.PORT || 3000,
	// Security
	fs = require('fs'),
	key = fs.readFileSync('./ssl/private.key'),
	ca = fs.readFileSync('./ssl/ca_bundle.crt'),
	cert = fs.readFileSync('./ssl/certificate.crt'),

	// Body parser
	bodyParser = require('body-parser'),

	// Socket.io
	server = require('https').createServer({ key: key, cert: cert }, app),
	io = require('socket.io')(server),

	// Database, backend
	MongoClient = require('mongodb').MongoClient,
	url = "mongodb://localhost:27017/",
	moment = require('moment'),
	dbName = "riftDB",
	mongoose = require('mongoose'),
	// Schemas
	{ riftSchema } = require('./models/rift.model.js'),
	Rift = mongoose.model('Rift', riftSchema),
	{ userSchema } = require('./models/user.model.js'),
	User = mongoose.model('User', userSchema)

	;

// App configuration
app.use(bodyParser.json())
app.use(express.json());
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(fileupload());

// Connect to database
mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
	if (!err) { console.log(`connection to mongoDB ${dbName} succeeded`) }
	else { console.log(`Error connecting to mongoDB ${err}`) }
});

// Route definitions
app.get("/", (req, res) => {
	res.set("Content-Type", "text/html");
	res.render("landing", { isHome: true });
});

app.get("/_", (req, res) => {
	res.redirect("/rifts");
});

// let allRifts = () => {
// 	let ret = Rift.find({}, (err, result) => {
// 		if (err) {
// 			res.send(err);
// 			console.log(err);
// 		} else {
// 			// console.log(result);
// 			return result;
// 		}
// 	}
// 	).lean().exec((err, docs) => docs);
// 	return ret;
// }

app.get("/rifts", (req, res) => {
	res.set("Content-Type", "text/html");
	Rift.find({}, (err, result) => res.render("rifts", { rifts: result })).lean().exec((err, docs) => err ? console.log(err) : docs)
});

app.get("/_/:riftName", (req, res) => {
	let thisRift;
	res.set("Content-Type", "text/html");
	Rift.find({}, (err, result) => {

		if (result.find((e) => e.name == req.params.riftName)) {
			thisRift = result.find((e) => e.name == req.params.riftName);
			// console.log("found an entry: ", thisRift);
			res.render("detail", { rift: thisRift, isRiftDetail: true });
		} else {
			console.log(`didnt find entry: ${req.params.riftName}`);
			res.status(404);
			res.render("404", { invalidRift: true });
		}

	}).lean().exec((err, docs) => err ? console.log(err) : docs)

});

app.get("/newRift", (req, res) => {
	res.render("newRift", {});
});

app.get("/newUser", (req, res) => {
	res.render("newUser", {});
});

// Image upload handler
app.post('/saveImage', (req, res) => {
	// const fileName = req.query.rift + '.jpg'
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
		console.log('--socket.io new data--');
		console.log(data);
		switch (data.type) {
			case 'rift':
				let newRiftObject = {
					owner: 69420666069420,
					title: data.title,
					name: data.title,
					desc: data.desc,
					banner: `/img/banner/${data.title}.jpg`,
					roles: [],
					locale: "en_US",
					members: [69420666069420],
					creationDate: moment()
				}
				Rift.create(newRiftObject);
				break;
			case 'post': 
				let newPostObject = {
					owner: 69420666069420,
					title: "Do not say",
					content: `So this is a totally original post. Yep. Mhm.`,
					visibility: [
						"all"
					],
					votes: [
						{ 69420666069420: "up" }, 
						{ 12345678901234: "down" } 
					],
					edited: true,
					editedDate: "6-8-20 13:35:03",
					creationDate: moment()
				}
				Post.create(newPostObject);
				break;
			case 'user':
				let newUserObject = {
					uid: 69420666069420,
					displayName: "Fashionable Stubble",
					email: "yoter@rift.works",
					userIcon: "/img/pfp/69420666069420.png",
					token: "234sdfgyj9dfg09idf15kasdf9q5q345kdfa93qj34ekj239",
					password: "insert passwordhash here",
					roles: [{ name: "Yoter"}, { name: "Bibba" }],
					locale: "en_US",
					creationDate: moment()
				}
				User.create(newUserObject);
				break;
				case 'message': 
				let newMessageObject = {
					author: 69420666069420,
					content: "Do not say do not say!",
					location: [
						"Austin"
					],
					reaction: [
						{ 69420666069420: ":lmao:" }, 
						{ 12345678901234: ":69420:" } 
					],
					edited: true,
					editedDate: "6-8-20 13:35:03",
					creationDate: moment()
				}
				Message.create(newMessageObject);
				break;
			default:
				break;
		}
	});
});

server.listen(port, () => console.log(`listening on ${port}`));
