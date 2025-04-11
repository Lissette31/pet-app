function PetCard({ pet }) {
  const fallbackImage = "1f10357f-c878-46e6-a3fd-3e952dfa5189.jpeg";
  const image =
    pet.photos && pet.photos.length > 0
      ? pet.photos[0].small
      : fallbackImage;

  return (
    <div className="card" style={styles.card}>
      <h2 style={styles.name}>{pet.name}</h2>
      <p><strong>Breed:</strong> {pet.breeds.primary}</p>
      <p><strong>Age:</strong> {pet.age}</p>
      <img
        src={image}
        alt={pet.name}
        width="150"
        height="150"
        style={{ objectFit: "cover", borderRadius: "12px", marginTop: "0.5rem" }}
      />
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "1rem",
    width: "180px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    color: "#e91e63"
  },
  name: {
    fontSize: "1.1rem",
    marginBottom: "0.25rem"
  }
};

export default PetCard;