import { useEffect, useState } from "react";
import { fetchToken, fetchPets } from "./api";
import PetCard from "./PetCard";
import "./index.css";

function App() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [maxWeight, setMaxWeight] = useState(100); // Simulated weight

  useEffect(() => {
    const loadPets = async () => {
      const token = await fetchToken();
      const petList = await fetchPets(token);
      setPets(petList);
    };
    loadPets();
  }, []);

  // 🐾 Filter logic
  const filteredPets = pets.filter((pet) => {
    const nameMatch = pet.name.toLowerCase().includes(search.toLowerCase());
    const ageMatch = ageFilter === "All" || pet.age === ageFilter;
    const typeMatch = typeFilter === "All" || pet.type === typeFilter;

    // Simulate weight logic (we pretend breed length = weight-ish)
    const fakeWeight = pet.breeds.primary.length * 2;
    const weightMatch = fakeWeight <= maxWeight;

    return nameMatch && ageMatch && typeMatch && weightMatch;
  });

  const totalPets = pets.length;
  const babyCount = pets.filter((pet) => pet.age === "Baby").length;
  const dogCount = pets.filter((pet) => pet.type === "Dog").length;

  return (
    <div>
      <h1>🐾 Lissette's Pet Finder</h1>

      <div className="stats">
        <p>Total Pets: {totalPets}</p>
        <p>Babies: {babyCount}</p>
        <p>Dogs: {dogCount}</p>
      </div>

      {/* Filters UI */}
      <div className="filters">
        {/* 🔍 Search by name */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 🎚️ Age filter */}
        <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
          <option value="All">All Ages</option>
          <option value="Baby">Baby</option>
          <option value="Young">Young</option>
          <option value="Adult">Adult</option>
          <option value="Senior">Senior</option>
        </select>

        {/* 🐶 Type filter */}
        <div className="radio-group">
          <label><input type="radio" name="type" value="All" checked={typeFilter === "All"} onChange={(e) => setTypeFilter(e.target.value)} /> All</label>
          <label><input type="radio" name="type" value="Dog" checked={typeFilter === "Dog"} onChange={(e) => setTypeFilter(e.target.value)} /> Dog</label>
          <label><input type="radio" name="type" value="Cat" checked={typeFilter === "Cat"} onChange={(e) => setTypeFilter(e.target.value)} /> Cat</label>
        </div>

        {/* 🧊 Simulated weight filter slider */}
        <label>
          Max Weight: {maxWeight} lbs
          <input
            type="range"
            min="10"
            max="100"
            step="10"
            value={maxWeight}
            onChange={(e) => setMaxWeight(Number(e.target.value))}
          />
        </label>
      </div>

      {/* Display Filtered Pets */}
      <div className="pet-list">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => <PetCard key={pet.id} pet={pet} />)
        ) : (
          <p>No pets match your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default App;

