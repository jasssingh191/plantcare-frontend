const API_BASE_URL = "https://perenual.com/api/v2";
const API_KEY = import.meta.env.VITE_PERENUAL_API_KEY;

const NOT_SPECIFIED = "Not specified";

const WATER_LABELS = {
  frequent: "Every 3 days",
  average: "Every 7 days",
  minimum: "Every 12 days",
  frequent_minimum: "Every 12 days",
  none: "Rarely",
};

function capitalizeWords(text) {
  return text
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function formatWateringCategory(watering) {
  if (!watering) return "As needed";
  const key = watering.trim().toLowerCase();
  return WATER_LABELS[key] || capitalizeWords(key.replace(/_/g, " "));
}

function formatSunlightList(sunlight) {
  if (!Array.isArray(sunlight) || sunlight.length === 0) {
    return NOT_SPECIFIED;
  }
  return sunlight
    .filter(Boolean)
    .map((entry) => capitalizeWords(entry.replace(/_/g, " ")))
    .join(", ");
}

// Maps a raw Perenual species-list item to the props <PlantCard /> expects.
export function normalizePlantData(item) {
  return {
    id: item.id,
    name: item.common_name,
    sci: Array.isArray(item.scientific_name)
      ? item.scientific_name[0]
      : item.scientific_name,
    imageUrl: item.default_image?.regular_url || item.default_image?.thumbnail || null,
  };
}

// Maps a raw Perenual species/details/{id} payload into everything
// <PlantDetailPage /> needs, filling in clean fallback text for any
// field the free tier doesn't return instead of leaving it blank.
export function normalizePlantDetails(payload) {
  const wateringBenchmark = payload.watering_general_benchmark;
  // Perenual sometimes returns the value wrapped in literal quote
  // characters (e.g. `"7-10"`) — strip those before displaying it.
  const wateringValue = wateringBenchmark?.value?.replace(/"/g, "");
  const wateringFrequency =
    wateringValue && wateringBenchmark?.unit
      ? `Every ${wateringValue} ${wateringBenchmark.unit}`
      : formatWateringCategory(payload.watering);

  const lightRequirements = formatSunlightList(payload.sunlight);

  const idealTemperature = payload.hardiness?.min && payload.hardiness?.max
    ? `USDA zone ${payload.hardiness.min}–${payload.hardiness.max}`
    : NOT_SPECIFIED;

  const tips = [];
  if (payload.care_level) {
    tips.push(`Care level: ${capitalizeWords(payload.care_level)}`);
  }
  if (payload.cycle) {
    tips.push(`Growth cycle: ${capitalizeWords(payload.cycle)}`);
  }
  if (payload.drought_tolerant) {
    tips.push("Drought tolerant once established.");
  }
  if (payload.indoor) {
    tips.push("Suitable for growing indoors.");
  }
  if (typeof payload.poisonous_to_pets === "number") {
    tips.push(
      payload.poisonous_to_pets > 0
        ? "Toxic to pets — keep away from cats and dogs."
        : "Non-toxic to pets."
    );
  }
  if (typeof payload.poisonous_to_humans === "number") {
    tips.push(
      payload.poisonous_to_humans > 0
        ? "Toxic to humans if ingested."
        : "Non-toxic to humans."
    );
  }
  if (tips.length === 0) {
    tips.push("Provide consistent watering and bright, indirect light for best results.");
  }

  return {
    id: payload.id,
    name: payload.common_name || "Unknown Plant",
    sci: Array.isArray(payload.scientific_name)
      ? payload.scientific_name[0]
      : payload.scientific_name || "",
    imageUrl: payload.default_image?.regular_url || payload.default_image?.original_url || null,
    description:
      (typeof payload.description === "string" && payload.description.trim()) ||
      "No description is available for this plant yet.",
    watering: wateringFrequency,
    sunlight: lightRequirements,
    careGuide: {
      wateringFrequency,
      lightRequirements,
      humidity: NOT_SPECIFIED,
      idealTemperature,
      soilType: NOT_SPECIFIED,
    },
    tips,
  };
}

async function perenualFetch(path) {
  if (!API_KEY) {
    console.error(
      "Perenual API Error: VITE_PERENUAL_API_KEY is not configured. " +
        "Copy .env.example to .env and add your key from https://perenual.com/subscription-api."
    );
    throw new Error("Missing Perenual API key");
  }

  const separator = path.includes("?") ? "&" : "?";
  const url = `${API_BASE_URL}${path}${separator}key=${API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    console.error("Perenual API Error:", res.status, res.statusText);
    const error = new Error(`Perenual API request failed: ${res.status} ${res.statusText}`);
    error.status = res.status;
    throw error;
  }

  return res.json();
}

// --- Request cache -----------------------------------------------
//
// The free Perenual tier only allows 100 requests/day, so repeat
// calls for the same thing (the same page mounting twice under
// StrictMode, revisiting Home after Explore, re-opening a plant
// already viewed, etc.) reuse the cache instead of hitting the
// network again.
//
// Think of it like a claim ticket: the first caller for a given
// `cacheKey` starts the real request and stores its (still pending)
// promise here. Anyone else asking for that same key — even before
// the first request has finished — gets handed that same promise
// instead of starting a second one.
//
// A failed request is removed from the cache so the next call can
// retry — except a 429 (rate limited), which stays cached as a
// failure for a minute, so we're not still hammering a rate-limited
// API on every click.
const requestCache = new Map();
const RATE_LIMIT_COOLDOWN_MS = 60_000;

function getCached(cacheKey, makeRequest) {
  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey);
  }

  const promise = makeRequest().catch((error) => {
    const cooldown = error.status === 429 ? RATE_LIMIT_COOLDOWN_MS : 0;
    setTimeout(() => requestCache.delete(cacheKey), cooldown);
    throw error;
  });

  requestCache.set(cacheKey, promise);
  return promise;
}

export async function searchPlants(query) {
  const key = query.trim().toLowerCase();
  return getCached(`search:${key}`, async () => {
    const payload = await perenualFetch(`/species-list?q=${encodeURIComponent(query)}`);
    return (payload.data || []).map(normalizePlantData);
  });
}

export async function fetchRegionalPlants() {
  // The free Perenual tier has no true "region" filter, so the default
  // species list stands in as a "recommended for you" set for now.
  return getCached("regional", async () => {
    const payload = await perenualFetch("/species-list");
    return (payload.data || []).map(normalizePlantData);
  });
}

export async function fetchPlantDetails(id) {
  return getCached(`details:${id}`, async () => {
    const payload = await perenualFetch(`/species/details/${encodeURIComponent(id)}`);
    return normalizePlantDetails(payload);
  });
}
