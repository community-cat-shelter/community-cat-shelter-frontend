const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const dataStore = require('nedb');
const db = new dataStore({ filename: 'db/catData.json', autoload: true });

var cat = { houseNumber: 1, weight: 'weight', houseTemp: 'temp', today: new Date()};

db.insert(cat, function (err, newCat) {   
    if(err){
        console.log("There was an error entering the cat into the db");
    }else{
        console.log("entering the cat" + newCat + " to the db worked just fine.")
    }
});




app.get('/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));