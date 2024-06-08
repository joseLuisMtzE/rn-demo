export const PRIMARY_COLOR: string = "#FF8B29";
export const TEXT_PRIMARY_COLOR: string = "#626262";
export const COLORS: string[] = [
  "#B0F0A4",
  "#F7BFD1",
  "#d2abe8",
  "#ABDFE7",
  "#EBC7DF",
  "#B4C1C7",
  "#FA9F9E",
  "#FFCF9E",
  "#72CCCC",
];

export const API_BASE_URL: string = "https://api.spoonacular.com/recipes";
export const API_KEY: string = "0747760e905642be971f7b505acb73b4";
// export const API_KEY: string = "9bfbee9a58fe4acdb9a0f54708c618e6";
import jsonData from "./data.json";
export const jsonDummyRecipes = jsonData;

interface categoriesProps {
  icon: string;
  label: string;
  type: string;
  // searchText: string;
}
[];

import mealTypesJson from "./MealTypes.json";
export const mealTypes: categoriesProps[] = mealTypesJson;
