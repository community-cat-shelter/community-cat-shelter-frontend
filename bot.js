const sqlite3 = require('sqlite3').verbose();
const rest = require('restler');
var logger = require('logger').createLogger();

const particleConfig = require('./particleConfig.js');

function saveDataFromPhoton() {
    let db = new sqlite3.Database('./db/catData.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        db.run("CREATE TABLE IF NOT EXISTS catData (date INTEGER, weight NUMERIC, shelterTemp NUMERIC, ambientTemp NUMERIC);");
      });

    // SORRY
    rest.get(`https://api.particle.io/v1/devices/${particleConfig.deviceID}/weight?access_token=${particleConfig.accessToken}`).on('complete', (weightData) => {
        rest.get(`https://api.particle.io/v1/devices/${particleConfig.deviceID}/fTempShelter?access_token=${particleConfig.accessToken}`).on('complete', (shelterTempData) => {
            rest.get(`https://api.particle.io/v1/devices/${particleConfig.deviceID}/fTempAmbient?access_token=${particleConfig.accessToken}`).on('complete', (ambientTempData) => {
                if (weightData.error) {
                    console.log("error!", weightData.error);
                } else {
                    db.run("CREATE TABLE IF NOT EXISTS catData (date INTEGER, weight NUMERIC, shelterTemp NUMERIC, ambientTemp NUMERIC);");
                    var d = new Date();
                    var seconds = Math.round(d.getTime() / 1000);
                    db.run(`INSERT INTO catData (date, weight, shelterTemp, ambientTemp) VALUES (${seconds}, ${Number.parseFloat(weightData.result).toFixed(2)}, ${Number.parseFloat(shelterTempData.result).toFixed(2)}, ${Number.parseFloat(ambientTempData.result).toFixed(2)})`);
                    logger.info("New cat data added");
                }
            });
        });
    });
}

//For demo, query every 10 seconds, but we would want to make this less for real life
//TODO data cleanup
saveDataFromPhoton();
setInterval(saveDataFromPhoton, 1000 * 30);