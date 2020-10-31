// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
let tablesData = require("./data/tables");
let waitListData = require("./data/waitlist");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "public/tables.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "public/reserve.html"));
});


app.get("/api/tables", function(req, res) {
  res.json(tablesData);
});

app.get("/api/waitlist", function(req, res) {
  res.json(waitListData);
});



app.post("/api/tables", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  // var tables = req.body;
  if (tablesData.length < 5) {
    tablesData.push(req.body);
    res.json(true)
  } else {
    waitListData.push(req.body);
    res.json(false)
  }

  


});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});