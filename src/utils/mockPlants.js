// Fallback data used when the plant API (see utils/plantApi.js) is
// unreachable, plus placeholder data for pages not yet wired to it.
// Shape matches normalizePlantData()'s output / <PlantCard /> props.
export const REGION_PLANTS = [
  { id: 1, name: "Golden Pothos", sci: "Epipremnum aureum", imageUrl: null },
  { id: 2, name: "Fiddle Leaf Fig", sci: "Ficus lyrata", imageUrl: null },
  { id: 3, name: "Peace Lily", sci: "Spathiphyllum wallisii", imageUrl: null },
  { id: 4, name: "Monstera Deliciosa", sci: "Monstera deliciosa", imageUrl: null },
  { id: 5, name: "Boston Fern", sci: "Nephrolepis exaltata", imageUrl: null },
  { id: 6, name: "Snake Plant", sci: "Dracaena trifasciata", imageUrl: null },
];

export const DIRECTORY_PLANTS = [
  ...REGION_PLANTS,
  { id: 7, name: "ZZ Plant", sci: "Zamioculcas zamiifolia", imageUrl: null },
  { id: 8, name: "Spider Plant", sci: "Chlorophytum comosum", imageUrl: null },
];

// Fallback detail data for <PlantDetailPage />, used when the live
// species/details/{id} call fails. Looks up the id against the mock
// list above so a card clicked from fallback data still opens to a
// matching detail page instead of a generic "unknown plant" page.
export function getMockPlantDetails(id) {
  const base = DIRECTORY_PLANTS.find((plant) => String(plant.id) === String(id));

  return {
    id,
    name: base?.name || "Unknown Plant",
    sci: base?.sci || "",
    imageUrl: base?.imageUrl || null,
    description: "No description is available for this plant yet.",
    watering: "As needed",
    sunlight: "Not specified",
    careGuide: {
      wateringFrequency: "As needed",
      lightRequirements: "Not specified",
      humidity: "Not specified",
      idealTemperature: "Not specified",
      soilType: "Not specified",
    },
    tips: ["Provide consistent watering and bright, indirect light for best results."],
  };
}
