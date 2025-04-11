import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchToken, fetchPets } from './api';
import Sidebar from './Sidebar';

export default function PetDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const loadPet = async () => {
      const token = await fetchToken();
      const pets = await fetchPets(token);
      const found = pets.find(p => p.id === id);
      setPet(found);
    };
    loadPet();
  }, [id]);

  if (!pet) return <p>Loading pet details...</p>;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '1rem' }}>
        <h2>{pet.name}</h2>
        <p><strong>Type:</strong> {pet.type}</p>
        <p><strong>Age:</strong> {pet.age}</p>
        <p><strong>Breed:</strong> {pet.breeds.primary}</p>
        <p><strong>Gender:</strong> {pet.gender}</p>
        <p><strong>Size:</strong> {pet.size}</p>
        <p><strong>Description:</strong> {pet.description || 'No description available'}</p>
      </div>
    </div>
  );
}

