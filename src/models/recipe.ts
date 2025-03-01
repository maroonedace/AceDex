export type Recipe = {
  id: number;
  name: string;
  image_url: string;
  ingredients: string[];
  instructions: string[];
  recipe_type: String;
  serving_size: number;
  prep_time: number;
  cook_time: number;
}
