const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({ extended: false });
//const about = require('./routes/about.js');
const PORT = 3000;

let buzzwords = [];

app.get('/', (req, res) => {
  res.render('public/index.html');
});

app.get('/buzzwords', (req, res) => {
  res.json({
    buzzword: 'taco',
  });
});

app.post('/buzzwords', urlParser, (req, res) => {
  if (buzzwords.length <= 5) {
    buzzwords.push(req.body);
  }
  res.send(`{ "success": true}`);
  console.log(buzzwords);
});

app.put('/buzzwords', urlParser, (req, res) => {
  console.log(req.body);
  console.log(req.body.buzzword);
  const result = buzzwords.find((obj) => obj.buzzword === req.body.buzzword);
  console.log('result', result);
  console.log(buzzwords);
  res.send(`{ "success": true}`);
});

app.delete('/buzzwords', urlParser, (req, res) => {
  console.log(req.body);
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
