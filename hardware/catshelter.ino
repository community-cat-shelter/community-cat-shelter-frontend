// This #include statement was automatically added by the Particle IDE.
#include <Adafruit_DHT.h>
#include <HX711ADC.h>

// thermometer pins
#define DHTPIN_AMBIENT 2     
#define DHTPIN2_SHELTER 3

// scale pins
// HX711.DOUT    - pin #A1
// HX711.PD_SCK    - pin #A0
#define SCALE_DOUT A1
#define SCALE_PD_SCK A0

#define DHTTYPE DHT22        // DHT 22 (AM2302)

// Connect pin 1 (on the left) of the sensor to +5V
// Connect pin 2 of the sensor to whatever your DHTPIN is
// Connect pin 4 (on the right) of the sensor to GROUND
// Connect a 10K resistor from pin 2 (data) to pin 1 (power) of the sensor

DHT dht_ambient(DHTPIN_AMBIENT, DHTTYPE);
DHT dht_shelter(DHTPIN2_SHELTER, DHTTYPE);
HX711ADC scale(SCALE_DOUT, SCALE_PD_SCK);    // parameter "gain" is ommited; the default value 128 is used by the library

double fTempAmbient; // internal temp
double fTempShelter; // external temp
double weight;

void setup() {
    Serial.begin(9600);
    Particle.variable("fTempAmbient", fTempAmbient);
    Particle.variable("fTempShelter", fTempShelter);

    dht_ambient.begin();
    dht_shelter.begin();
    Particle.variable("weight", weight);

    scale.set_scale(11787);
    scale.tare();                        // reset the scale to 0
    weight = scale.get_units(10); // weight returns oz
}

void loop() {
// Wait a few seconds between measurements.
    delay(2000);

// Reading temperature or humidity takes about 250 milliseconds!
// Sensor readings may also be up to 2 seconds 'old' (its a
// very slow sensor)
    float humid_ambient = dht_ambient.getHumidity();
    float humid_shelter = dht_shelter.getHumidity();
// Read temperature as Celsius
    float tempC_ambient = dht_ambient.getTempCelcius();
    float tempC_shelter = dht_shelter.getTempCelcius();
// Read temperature as Farenheit
    float tempF_ambient = dht_ambient.getTempFarenheit();
    float tempF_shelter = dht_shelter.getTempFarenheit();
    fTempAmbient = tempF_ambient;
    fTempShelter = tempF_shelter;
    
   Particle.publish("tempF_ambient",String(tempF_ambient) );
  // Particle.publish("humid_ambient",String(h) );
   
   Particle.publish("tempF_shelter",String(tempF_shelter) );
   //Particle.publish("humid_shelter",String(h2) );
   
// Check if any reads failed and exit early (to try again).
    if (isnan(humid_ambient) || isnan(humid_shelter) || isnan(tempF_ambient) || isnan(tempF_shelter)) {
        Serial.println("Failed to read from DHT sensor!");
        return;
    }

// Compute heat index
// Must send in temp in Fahrenheit!
    float ambient_heatIdx = dht_ambient.getHeatIndex();
    float ambient_dewPoint = dht_ambient.getDewPoint();
    float ambient_kelvin = dht_ambient.getTempKelvin();
    
    float shelter_heatIdx = dht_shelter.getHeatIndex();
    float shelter_dewPoint = dht_shelter.getDewPoint();
    float shelter_kelvin = dht_shelter.getTempKelvin();

    weight = scale.get_units(10);
    Particle.publish("weight", String(weight) );

    scale.power_down();                    // put the ADC in sleep mode
    delay(5000);
    scale.power_up();
}