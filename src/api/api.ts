import { invoke } from "@tauri-apps/api/core";
import { Recipe } from "../models/recipe";

export const fetchCocktails = (): Promise<Recipe[]> => {
  const data: Promise<Recipe[]> = invoke("get_data");
  return data;
};
