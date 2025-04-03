// src/api.js
export const fetchToken = async () => {
    const res = await fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: import.meta.env.VITE_PETFINDER_KEY,
        client_secret: import.meta.env.VITE_PETFINDER_SECRET,
      }),
    });
  
    const data = await res.json();
    return data.access_token;
  };
  
  export const fetchPets = async (token) => {
    const res = await fetch("https://api.petfinder.com/v2/animals?limit=20", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await res.json();
    return data.animals;
  };
  