import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Rekisteröidään Chart.js komponentit
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DataChart = ({ data }) => {
  // Käytetään aikaleimaa tai järjestysnumeroa x-akselille
  const labels = data.map((entry, index) => `Data ${index + 1}`);

  // Poimitaan lämpötila- ja kosteusdata
  const temperatureData = data.map(entry => entry.dhtTemp);
  const humidityData = data.map(entry => entry.humidity);

  // Chart.js data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Lämpötila (°C)',
        data: temperatureData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Kosteus (%)',
        data: humidityData,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'ESP32 Sensor Data',
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DataChart;
