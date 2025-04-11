import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Chart1 from './assets/Chart1';
import Chart2 from './assets/Chart2';

// Sample pet data (can be replaced with fetched data)
const pets = [
  { id: 1, name: 'Buddy', type: 'Dog', age: 3 },
  { id: 2, name: 'Mittens', type: 'Cat', age: 2 }
];

export default function Dashboard() {
  const [showCharts, setShowCharts] = useState(true);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '1rem' }}>
        <h1>🐾 Pet Dashboard</h1>

        <ul>
          {pets.map(pet => (
            <li key={pet.id}>
              <Link to={`/pet/${pet.id}`}>{pet.name}</Link>
            </li>
          ))}
        </ul>

        {/* Explanation paragraph */}
        <p style={{ fontStyle: 'italic', marginTop: '1rem' }}>
          Most adoptable pets are <strong>young dogs</strong>! Use the filters to narrow down what you're looking for.
        </p>
       
        {/*  Toggle Button */}
        <button onClick={() => setShowCharts(!showCharts)} style={{ margin: '1rem 0' }}>
          {showCharts ? 'Hide Charts' : 'Show Charts'}
        </button>

        {/* Charts Section */}
        {showCharts && (
          <div className="charts" style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
            <Chart1 data={pets} />
            <Chart2 data={pets} />
          </div>
        )}
      </div>
    </div>
  );
}
