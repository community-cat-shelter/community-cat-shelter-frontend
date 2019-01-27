const dataStore = require('nedb');
const rest = require('restler');
var logger = require('logger').createLogger();

const particleConfig = require('./particleConfig.js');

const db = new dataStore({ filename: 'db/catData.db', autoload: true });

function saveDataFromPhoton() {
    // SORRY
    rest.get(`https://api.particle.io/v1/devices/${particleConfig.deviceID}/weight?access_token=${particleConfig.accessToken}`).on('complete', (weightData) => {
        rest.get(`https://api.particle.io/v1/devices/${particleConfig.deviceID}/fTempShelter?access_token=${particleConfig.accessToken}`).on('complete', (shelterTempData) => {
            rest.get(`https://api.particle.io/v1/devices/${particleConfig.deviceID}/fTempAmbient?access_token=${particleConfig.accessToken}`).on('complete', (ambientTempData) => {
                createCatData('1', Number.parseFloat(weightData.result).toFixed(2), Number.parseFloat(shelterTempData.result).toFixed(2), Number.parseFloat(ambientTempData.result).toFixed(2));
            });
        });
    });
}

function Cat(houseNumber, weight, shelterTemp, ambientTemp) {
    this.houseNumber = houseNumber;
    this.weight = weight;
    this.shelterTemp = shelterTemp;
    this.ambientTemp = ambientTemp;
    this.date = new Date();
}
   
function createCatData(houseNumber, weight, shelterTemp, ambientTemp){
    var cat = new Cat(houseNumber, weight, shelterTemp, ambientTemp)
    db.insert(cat, function (err, newCat) {
        if(err){
            logger.info("Error writing to the db");
        }else{
            logger.info("New cat data added")
        }
    });
}

//For demo, query every 10 seconds, but we would want to make this less for real life
//TODO data cleanup
saveDataFromPhoton();
setInterval(saveDataFromPhoton, 1000 * 30);