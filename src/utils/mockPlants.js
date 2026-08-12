// Placeholder data until the plant API (see utils/plantApi.js) is wired in.
export const REGION_PLANTS = [
  { id: 1, name: "Golden Pothos", scientificName: "Epipremnum aureum", wateringDays: 8, light: "Medium indirect" },
  { id: 2, name: "Fiddle Leaf Fig", scientificName: "Ficus lyrata", wateringDays: 9, light: "Bright indirect" },
  { id: 3, name: "Peace Lily", scientificName: "Spathiphyllum wallisii", wateringDays: 6, light: "Low light" },
  { id: 4, name: "Monstera Deliciosa", scientificName: "Monstera deliciosa", wateringDays: 7, light: "Bright indirect" },
  { id: 5, name: "Boston Fern", scientificName: "Nephrolepis exaltata", wateringDays: 3, light: "Partial shade" },
  { id: 6, name: "Snake Plant", scientificName: "Dracaena trifasciata", wateringDays: 14, light: "Low to bright" },
];

export const DIRECTORY_PLANTS = [
  ...REGION_PLANTS,
  { id: 7, name: "ZZ Plant", scientificName: "Zamioculcas zamiifolia", wateringDays: 21, light: "Low to indirect" },
  { id: 8, name: "Spider Plant", scientificName: "Chlorophytum comosum", wateringDays: 7, light: "Medium indirect" },
];
