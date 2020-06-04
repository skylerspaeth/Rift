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

//I dont really know what I'm doing
fileupload(),
        app.post('/saveImage', (req, res) => {
            const fileName = req.files.myFile.name
            const path = __dirname + '/images/' + fileName
          
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
              res.end(JSON.stringify({ status: 'success', path: '/img/houses/' + fileName }))
            })
          })
          const handleImageUpload = event => {
            const files = event.target.files
            const formData = new FormData()
            formData.append('imageUpload', files[0])
          
            fetch('/img/', {
              method: 'POST',
              body: formData
            })
            .then(response => response.json())
            .then(data => {
              console.log(data.path)
            })
            .catch(error => {
              console.error(error)
            })
          }
          
          document.querySelector('#fileUpload').addEventListener('change', event => {
            handleImageUpload(event)
          })
        
          const handleImageUpload = event => {
            const files = event.target.files;
            const myImage = files[0];
            const imageType = /image.*/;
          
            if (!myImage.type.match(imageType)) {
              alert('Sorry, only images are allowed');
              return;
            }
          
            if (myImage.size > (100*1024)) {
              alert('Sorry, the max allowed size for images is 100KB');
              return;
            }
          
        }
          
//End of me not knowing what I'm doing        

// App configuration
app.use(bodyParser.json())
app.use(express.json());
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

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
  // console.log("this function should only be called with a type in the querystring");
  // }
});

// Socket definitions
io.on('connection', (client) => {
  console.log('someone connected');
  client.on('create', (data) => {
    console.log(data);
  });
});

server.listen(port, () => console.log(`listening on ${port}`));
