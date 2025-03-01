import { invoke } from "@tauri-apps/api/core";
import { Recipe } from "../models/recipe";

export const fetchRecipes = (type?: string): Promise<Recipe[]> => {
  const recipeType = type ? type: ""
  const data: Promise<Recipe[]> = invoke("get_recipes", {recipeType});
  return data;
};

export const fetchPokemon = (): Promise<any> => {
  const data: Promise<Recipe[]> = invoke("get_pokemon");
  return data;
};
