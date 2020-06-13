// Dependencies
var fs = require ("fs");
var express = require("express");
var path = require("path");

fs.readFile("./db/db.json", function(err) {
  if (err) throw err;
  console.log('Reading db.json!');

})

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3001;
var notes = [{ title: 'Honza', text: 'Is crazy smart' },
{ title: 'Erin', text: 'is in Computer first grade' },
{ title: 'Erin', text: 'Upgrade to second grade' }];

// Sets up the Express app to handle data parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes HTML 
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
  
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

  
 // Routes API  

 //Display all notes
app.get("/api/notes", function(req, res) {
  return res.json(notes);
  });

app.get("*", function(req, res) {  //FIGURE OUT THE STAR
    res.sendFile(path.join(__dirname, "index.html"));
  });
// Create New Notes - takes in JSON input
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
   notes.push(newNote);

    console.log(newNote);
    res.json(newNote);
});

app.delete("/api/notes", function (req, res) {  /// DONT UNDERSTAND
  res.send('Got a DELETE request at /user')
});

app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
});