function PetCard({ pet }) {
  const fallbackImage ="1f10357f-c878-46e6-a3fd-3e952dfa5189.jpeg";
  const image =
    pet.photos && pet.photos.length > 0
      ? pet.photos[0].small
      : fallbackImage;

  return (
    <div className="card">
      <h2>{pet.name}</h2>
      <p><strong>Breed:</strong> {pet.breeds.primary}</p>
      <p><strong>Age:</strong> {pet.age}</p>
      <img src={image} alt={pet.name} width="150" />
    </div>
  );
}

export default PetCard;

  