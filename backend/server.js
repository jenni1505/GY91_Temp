const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Testireitti
app.get('/', (req, res) => {
  res.send('ESP32 Temperature API toimii!');
});

let sensorData = [];  // Tallennetaan vastaanotettu data muistiin

// Vastaanottaa dataa ESP32:lta
app.post('/data', (req, res) => {
  const { bmpTemp, pressure, dhtTemp, humidity } = req.body;
  
  const newEntry = {
    bmpTemp,
    pressure,
    dhtTemp,
    humidity,
    timestamp: new Date().toLocaleTimeString()  // Lisätään aikaleima
  };

  sensorData.push(newEntry);  // Tallennetaan data muistiin

  console.log('Vastaanotettu data ESP32:lta:', newEntry);
  res.status(200).send('Data vastaanotettu onnistuneesti!');
});

// Reitti frontendin datan hakemiseen
app.get('/data', (req, res) => {
  res.json(sensorData);
});

// Käynnistetään palvelin
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveri käynnissä portissa ${PORT}`);
});
