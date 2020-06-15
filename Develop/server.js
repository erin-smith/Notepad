// Dependencies
var fs = require("fs");
var express = require("express");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3001;

var notes = [{ title: 'Honza', text: 'Is crazy smart' }, //placeholder
{ title: 'Erin', text: 'is in Computer first grade' },
{ title: 'Erin', text: 'Upgrade to second grade' }];

// Sets up the Express app to handle data parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes API  
app.get("/api/notes", function (req, res)
{
  fs.readFile("./db/db.json", "utf8", function (err, data)
  {
    if (err) {
      throw err;
    }
    else {
      res.json(JSON.parse(data));
}
    })
});


// Create New Notes - takes in JSON input
app.post("/api/notes", function (req, res)
{
  fs.readFile("./db/db.json", "utf8", function (err, data)
  {
    if (err) {
      throw err;
    }
    else {
      var notes = JSON.parse(data);
      var id = notes[notes.length] +1;
      var newNote = {...req.body, "ID": id};
      notes.push(newNote);
      console.log(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), function (err, data)
{
  if (err) {
    throw err;
  }
  else {
    res.json(newNote);
  }
});
}
});
});

/// DELETE Should receive a query parameter containing the id of a note to delete.
  // This means you'll need to find a way to give each note a unique `id` when it's saved. 
  //In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", function (req, res)
{
  var getid =  parseInt(id);
  console.log(id);
  fs.readFile("./db/db.json", function (err, data)
  {
    if (err) {
      throw err;
    }
    else {
      let notes = JSON.parse(data);
      notes = notes.filter(newNote => newNote.id !== getid);
      fs.writeFile("./db/db.json", JSON.stringify(notes), function (err, data)
{
  if (err) {
    throw err;
  }
  else {
      res.json(newNote);
      res.send('Got a DELETE request at /user');
    }
  });
}
});
});

// Routes HTML 
app.get("/", function (req, res)
{
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res)
{
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res)
{  // If no matching route is found default to home
  res.sendFile(path.join(__dirname, "public/index.html"));
});


app.listen(PORT, function ()
{
  console.log("App listening on PORT " + PORT);
});

