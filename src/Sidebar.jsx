import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside style={{ width: '200px', padding: '1rem', borderRight: '1px solid gray' }}>
      <h3>🐾 Pet Finder</h3>
      <Link to="/">Dashboard</Link>
    </aside>
  );
}
