const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// <host>/catData?limit=1 (limit is optional)
app.get('/catData', (req, res, callback) => {
  let db = new sqlite3.Database('./db/catData.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err);
    }
  });

  if (req.query.limit === undefined) {
    db.all('SELECT date, weight, shelterTemp, ambientTemp FROM catData ORDER BY date DESC', function(err, rows) {
      if (err) {
        res.status(500).send(err); 
      } else {
        res.status(200).send(rows);
      }
    });
  } else {
    db.all(`SELECT date, weight, shelterTemp, ambientTemp FROM catData ORDER BY date DESC LIMIT ${req.query.limit}`, function(err, rows) {
      if (err) {
        res.status(500).send(err); 
      } else {
        res.status(200).send(rows);
      }
    });
  }
 });

app.post('/', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));