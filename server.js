const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const dataStore = require('nedb');
const db = new dataStore({ filename: 'db/catData.json', autoload: true });
// db.loadDatabase();

app.use(bodyParser.json())
app.get('/', (req, res, callback) => {
  db.find({}, function (err, docs) {
    if(err){
      console.log(err);
    }else{
      console.log('SUCCESS')
      console.log('docs ' + docs);
    }
  });

  console.log('response' + res.body)
  


  res.send({ express: res.body});
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));