import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Chart2({ data }) {
  console.log("Chart2 rendering with data:", data);

  const ageCounts = data.reduce((acc, pet) => {
    acc[pet.age] = (acc[pet.age] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h3>Pet Ages</h3>
      <Bar
        data={{
          labels: Object.keys(ageCounts),
          datasets: [
            {
              label: 'Number of Pets',
              data: Object.values(ageCounts),
              backgroundColor: '#8e44ad',
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true },
          },
        }}
      />
    </div>
  );
}

