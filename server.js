const express = require('express');
const bodyParser = require('body-parser');
const dataStore = require('nedb');

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = new dataStore({ filename: 'db/catData.db', autoload: true });

app.get('/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// <host>/catData?limit=1 (limit is optional)
app.get('/catData', (req, res, callback) => {
    if (req.query.limit !== undefined) {
      db.find({}).limit(req.query.limit ).exec(function (err, docs) {
        res.send(200, docs);
      });
    } else {
      db.find({}, function (err, docs) {
        res.send(200, docs);
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