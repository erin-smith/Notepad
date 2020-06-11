// Dependencies
var fs = require ("fs");
var express = require("express");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes HTML 
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
  
 // Routes API  

 //Return all notes
  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });

// Create New Notes - takes in JSON input
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
    console.log(newNote);
    res.json(newNote);
});

app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
});