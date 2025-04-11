import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchToken, fetchPets } from "./api";
import PetCard from "./PetCard";
import PetDetail from "./PetDetail";
import Chart1 from "./assets/Chart1";
import Chart2 from "./assets/Chart2";

function Dashboard({
  pets,
  search,
  setSearch,
  ageFilter,
  setAgeFilter,
  typeFilter,
  setTypeFilter,
  maxWeight,
  setMaxWeight
}) {
  const filteredPets = pets.filter((pet) => {
    const nameMatch = pet.name.toLowerCase().includes(search.toLowerCase());
    const ageMatch = ageFilter === "All" || pet.age === ageFilter;
    const typeMatch = typeFilter === "All" || pet.type === typeFilter;
    const fakeWeight = pet.breeds.primary.length * 2;
    const weightMatch = fakeWeight <= maxWeight;
    return nameMatch && ageMatch && typeMatch && weightMatch;
  });

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🐾 Lissette's Pet Finder</h1>
      <p>{pets.length} pets loaded</p>

      {/* Filters */}
      <div className="filters" style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
          <option value="All">All Ages</option>
          <option value="Baby">Baby</option>
          <option value="Young">Young</option>
          <option value="Adult">Adult</option>
          <option value="Senior">Senior</option>
        </select>

        <div style={{ marginTop: "1rem" }}>
          <label>
            <input
              type="radio"
              name="type"
              value="All"
              checked={typeFilter === "All"}
              onChange={(e) => setTypeFilter(e.target.value)}
            /> All
          </label>
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="radio"
              name="type"
              value="Dog"
              checked={typeFilter === "Dog"}
              onChange={(e) => setTypeFilter(e.target.value)}
            /> Dog
          </label>
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="radio"
              name="type"
              value="Cat"
              checked={typeFilter === "Cat"}
              onChange={(e) => setTypeFilter(e.target.value)}
            /> Cat
          </label>
        </div>

        <div style={{ marginTop: "1rem" }}>
          Max Weight: {maxWeight} lbs
          <input
            type="range"
            min="10"
            max="100"
            step="10"
            value={maxWeight}
            onChange={(e) => setMaxWeight(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="charts" style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2rem" }}>
        <Chart1 data={pets} />
        <Chart2 data={pets} />
      </div>

      {/* Pet Cards */}
      <div className="pet-list" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <a
              key={pet.id}
              href={`/pet/${pet.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <PetCard pet={pet} />
            </a>
          ))
        ) : (
          <p>No pets match your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [maxWeight, setMaxWeight] = useState(100);

  useEffect(() => {
    const loadPets = async () => {
      const token = await fetchToken();
      const petList = await fetchPets(token);
      setPets(petList);
    };
    loadPets();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            pets={pets}
            search={search}
            setSearch={setSearch}
            ageFilter={ageFilter}
            setAgeFilter={setAgeFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            maxWeight={maxWeight}
            setMaxWeight={setMaxWeight}
          />
        }
      />
      <Route path="/pet/:id" element={<PetDetail />} />
    </Routes>
  );
}
