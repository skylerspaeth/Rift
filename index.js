// Database schema initialization
require("./models/db.js");
const
  // Webserver, templating
  express = require("express"),
  app = express(),
  hbs = require("express-handlebars").create({ defaultLayout: "main" }),
  port = 3000,

  // Body parser
  bodyParser = require('body-parser'),

  // Database, backend
  jsonDB = require("./jsonDB.js").db,
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
        riftToAdd.title = req.body.newTitle;
        riftToAdd.name = req.body.newName;
        riftToAdd.desc = req.body.newDesc;
        riftToAdd.banner = req.body.newBanner;
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

let thisRift;

class Post {
  constructor(author, context, content) {
    this.author = author;
    this.context = context;
    this.content = content;
  }
}

// App configuration
app.use(bodyParser.json());
app.use(express.json());
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));


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
    console.log("found an entry: ", thisRift);
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
  if (req.query.type) {
    console.log(`${req.query.type} sent a POST request with the content`);
    // console.log(JSON.stringify(req.body));
  } else {
    console.log("this function should only be called with a type in the querystring");
  }
});

app.listen(port, () => console.log(`listening on ${port}`));
