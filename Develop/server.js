// Dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const myDbFilePath = path.join(__dirname, 'db/db.json');
console.log(myDbFilePath);

// Sets up the Express App
let app = express();
let PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes API  
app.get("/api/notes", function (req, res)
{
  /*
  fs.readFile(myDbFilePath, "utf8", function (err, data)
  {
    if (err) {
      throw err;
    }
    else {
      res.json(JSON.parse(data));
    }
  })*/

  readFile(myDbFilePath, "utf8").then(data => res.json(JSON.parse(data)));
});

function generateNewId(currentNotes)
{
  let highestId = 0;
  currentNotes.forEach(note => {
      if(note.id > highestId){
        highestId = note.id;
      }
  });
  return highestId + 1;
}


// Create New Notes - takes in JSON input
app.post("/api/notes", function (req, res)
{
  /*
  fs.readFile(myDbFilePath, "utf8", function (err, data)
  {
    if (err) {
      throw err;
    }
    else {

      let notes = JSON.parse(data);
      let id = generateNewId(notes);
      let newNote = { ...req.body, "id": id };
      notes.push(newNote);
      console.log(newNote);
      fs.writeFile(myDbFilePath, JSON.stringify(notes), function (err, data)
      {
        if (err) {
          throw err;
        }
        else {
          res.json(newNote);
        }
      });
    }
  });*/

  readFile(myDbFilePath, "utf8").then(data => {
    let notes = JSON.parse(data);
    const newNote = { ...req.body, "id": generateNewId(notes) };
    notes.push(newNote);
    writeFile(myDbFilePath, JSON.stringify(notes)).then( () => res.json(newNote));
  });
});

app.delete("/api/notes/:id", function (req, res)
{
  const idToBeDeleted = parseInt(req.params.id);
 /*
  console.log(idToBeDeleted);
  fs.readFile(myDbFilePath, function (err, data)
  {
    if (err) {
      throw err;
    }
    else {
      let notes = JSON.parse(data);
      notes = notes.filter(newNote => newNote.id !== idToBeDeleted);
      fs.writeFile(myDbFilePath, JSON.stringify(notes), function (err, data)
      {
        if (err) {
          throw err;
        }
        else {
          res.send('Got a DELETE request at /user');
        }
      });
    }
  });
  */
    readFile(myDbFilePath, "utf8").then(data => {
      let notes = JSON.parse(data);
      notes = notes.filter(newNote => newNote.id !== idToBeDeleted);
      writeFile(myDbFilePath, JSON.stringify(notes)).then( ()=> {
        res.send('Got a DELETE request at /user');
      }).catch((error) => {
          console.log(`Error writing file ${myDbFilePath}`);
      });
    }).catch((error) => {
      console.log(`Error reading file ${myDbFilePath}`);
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

