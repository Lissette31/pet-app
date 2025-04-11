console.log("Chart1 is rendering");

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart1() {
  return (
    <div>
      <h3>Test Pie Chart</h3>
      <Pie
        data={{
          labels: ['Dogs', 'Cats', 'Others'],
          datasets: [
            {
              data: [10, 5, 3],
              backgroundColor: ['#f39c12', '#8e44ad', '#2ecc71'],
            },
          ],
        }}
      />
    </div>
  );
}



