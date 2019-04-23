const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({ extended: false });
//const about = require('./routes/about.js');
const PORT = 3000;

let buzzwords = [];

app.use(express.static('public'));
app.use(urlParser);

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/buzzwords', (req, res) => {
  console.log(buzzwords);
  res.send(`${buzzwords}`);
});

app.post('/buzzwords', urlParser, (req, res) => {
  if (buzzwords.length <= 5) {
    buzzwords.push(req.body);
  }
  res.send(`{ "success": true}`);
  console.log(buzzwords);
});

app.put('/buzzwords', urlParser, (req, res) => {
  const findBuzzword = buzzwords.indexOf(buzzwords.find((obj) => obj.buzzword === req.body.buzzword));
  if (findBuzzword > -1) {
    buzzwords[findBuzzword].points = req.body.points;
    res.send(`{ "success": true }`);
  } else {
    res.send(`{ "success": false }`);
  }
  console.log(buzzwords);
});

app.delete('/buzzwords', urlParser, (req, res) => {
  const findBuzzword = buzzwords.indexOf(buzzwords.find((obj) => obj.buzzword === req.body.buzzword));
  if (findBuzzword > -1) {
    buzzwords.splice(findBuzzword, 1);
    res.send(`{ "success": true }`);
  } else {
    res.send(`{ "success": false }`);
  }
  console.log(buzzwords);
});

app.post('/reset', urlParser, (req, res) => {
  console.log(buzzwords);
});

app.post('/heard', urlParser, (req, res) => {
  console.log(buzzwords);
});

const server = app.listen(PORT, () => {
  console.log(`Express app is running on port ${PORT}`);
});
