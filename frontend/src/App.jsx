import React, { useEffect, useState } from 'react';
import DataChart from './components/DataChart';

function App() {
  const [data, setData] = useState([]);

  // Haetaan data Node.js API:lta
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.104:3000/data'); // Vaihda IP tarvittaessa
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Virhe datan hakemisessa:', error);
      }
    };

    // Haetaan data 5 sekunnin välein
    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>ESP32 Sensor Data</h1>
      <DataChart data={data} />
    </div>
  );
}

export default App;
