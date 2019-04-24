'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlParser = bodyParser.urlencoded({ extended: false });
const PORT = 3000;

let buzzwords = [];
let score = 0;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/buzzwords', (req, res) => {
  res.send(`"buzzwords": ${JSON.stringify(buzzwords)}`);
});

app.post('/buzzwords', urlParser, (req, res) => {
  //check for 'buzzword' & 'points' keys
  const hasKeys = !(req.body.buzzword === undefined || req.body.points === undefined);
  if ((buzzwords.length <= 5) & hasKeys) {
    buzzwords.push(req.body);
    res.send(`{ "success": true}`);
  } else if (buzzwords.length > 5 || !hasKeys) {
    res.send(`{ "success": false}`);
  }
});

app.put('/buzzwords', urlParser, (req, res) => {
  const findBuzzword = buzzwords.indexOf(buzzwords.find((obj) => obj.buzzword === req.body.buzzword));
  const hasKeys = !(req.body.buzzword === undefined || req.body.points === undefined);
  if (findBuzzword > -1 && hasKeys) {
    buzzwords[findBuzzword].points = req.body.points;
    res.send(`{ "success": true }`);
  } else {
    res.send(`{ "success": false }`);
  }
});

app.delete('/buzzwords', urlParser, (req, res) => {
  const findBuzzword = buzzwords.indexOf(buzzwords.find((obj) => obj.buzzword === req.body.buzzword));
  if (findBuzzword > -1) {
    buzzwords.splice(findBuzzword, 1);
    res.send(`{ "success": true }`);
  } else {
    res.send(`{ "success": false }`);
  }
});

app.post('/reset', urlParser, (req, res) => {
  buzzwords = [];
  score = 0;
  res.send(`{ "success": true }`);
});

app.post('/heard', urlParser, (req, res) => {
  const findBuzzword = buzzwords.indexOf(buzzwords.find((obj) => obj.buzzword === req.body.buzzword));
  if (findBuzzword > -1) {
    score += Number(buzzwords[findBuzzword].points);
    res.send(`{ "totalScore": ${score} }`);
  } else {
    res.send(`{ "success": false }`);
  }
});

const server = app.listen(PORT, () => {
  console.log(`Express app is running on port ${PORT}`);
});
