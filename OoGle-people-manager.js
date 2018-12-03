/**
 * This class simulates the database that keeps
 * track of employees in the company
 *
 * @author Alec Allain
 * @version 11/29/18
 */

// The API toolkit for making REST systems easily
const express = require('express');
// A good solution for handling JSON data in routes
const bodyParser = require('body-parser');
// Node JS modules for filesystem access
const fs = require('fs');
// Our database connection
// This will be a JSON object of our programmers
// and can be accessed as if it was any other javascript
// object
const database = require('./programmers.json');
// Creates an array of database objects
const data = [database];

// Creates keys for every entry
const keys = Object.keys(data);

// Make an instance of our express application
const app = express();
// Specify our > 1024 port to run on
const port = 3000;

// Apply our middleware so our code can natively handle JSON easily
app.use(bodyParser.json());

// We must have our list of programmers to use
if (!fs.existsSync('./programmers.json')) {
  throw new Error('Could not find database of programmers!');
}

// Build our routes

app.get('/', (req, res) => {
  res.send(data);
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(data[id]);
  
  //res.send(`Fill me in to return values with ID: ${id}`);
});

app.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const bkeys = Object.keys(body);

  var d = data.length - 1;
  
  for (var d = data.length - 1; d >= 0; d--) {
	if (data[n].SID === id) {
		data.splice(n, 1);
	}
  }

  let holder = {};
  keys.forEach(i => {
  	if (!body[i]) {
		holder[i] = "";
	} else {
		holder[i] = body[i];
	}
  });
  data.push(holder);
  res.send(`Updated values with ID: ${id}`);
});

app.post('/', (req, res) => {
  const body = req.body; // Hold your JSON in here!
  console.log(body);
  data[req.body.SID] = body;
  console.log(data);
  
  res.send(`You sent: ${body}`);
});

// IMPLEMENT A ROUTE TO HANDLE ALL OTHER ROUTES AND RETURN AN ERROR MESSAGE
app.all('*', (req, res) => {
	res.sendStatus(404);
});

app.get('/all', (req, res) => {
	res.json(data);
});

app.listen(port, () => {
  console.log(`She's alive on port ${port}`);
});
