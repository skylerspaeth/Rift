// Database schema initialization
require("./models/db.js");
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
  jsonDB = require("./jsonDB.js").db
  ;

let thisRift;

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
  res.render("landing");
});

app.get("/rifts", (req, res) => {
  res.set("Content-Type", "text/html");
  res.render("rifts", { rifts: jsonDB });
});

app.get("/_/:riftName", (req, res) => {
  res.set("Content-Type", "text/html");
  if (jsonDB.find((e) => e.name == req.params.riftName)) {
    thisRift = jsonDB.find((e) => e.name == req.params.riftName);
    // console.log("found an entry: ", thisRift);
    res.render("detail", { rift: thisRift });
  } else {
    console.log("didnt find an entry");
    res.status(404);
    res.render("404", { invalidRift: true });
  }
});

app.get("/newRift", (req, res) => {
  res.render("newRift", {});
});

app.post("/submit", (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  console.log('--post data--');
  console.log(req.body);
  // if (req.query.type) {
  // console.log(`${req.query.type} sent a POST request with the content`);
  // console.log(req.body.title);
  // } else {
  //" console.log("this function should only be called with a type in the querystring");
  // }
});

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
    console.log(data);
  });
});

server.listen(port, () => console.log(`listening on ${port}`));
