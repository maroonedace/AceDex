import { useQuery } from "@tanstack/react-query";
import { fetchRecipes } from "../api/api";

const useRecipes = (type?: string) => {
  const queryKey = ["recipes"];

  const { data, isFetched } = useQuery({
    queryKey,
    queryFn: () => fetchRecipes(type),
  });

  return {
    recipes: data,
    isRecipesFetched: isFetched,
  };
};

export default useRecipes;
