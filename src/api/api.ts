import { invoke } from "@tauri-apps/api/core";
import { Recipe } from "../models/recipe";
import { Pokemon } from "../models/pokemon";

export const fetchRecipes = (type?: string): Promise<Recipe[]> => {
  const recipeType = type ? type: ""
  const data: Promise<Recipe[]> = invoke("get_recipes", {recipeType});
  return data;
};

export const fetchPokemonByGeneration = (generation: string): Promise<Pokemon[]> => {
  const data: Promise<Pokemon[]> = invoke("get_pokemon_by_generation", {generation});
  return data;
};
