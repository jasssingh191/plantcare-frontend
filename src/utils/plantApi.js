const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function searchPlants(query) {
  const response = await fetch(
    `${API_BASE_URL}/plants/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Plant search failed");
  }

  return response.json();
}

export async function fetchPlantsByRegion(region) {
  const response = await fetch(
    `${API_BASE_URL}/plants/region/${encodeURIComponent(region)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch plants for region");
  }

  return response.json();
}
