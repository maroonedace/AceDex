import { useQuery } from "@tanstack/react-query";
import { fetchCocktails } from "../api/api";

const useCocktails = () => {
  const queryKey = ["cocktails"];

  const { data, isFetched } = useQuery({
    queryKey,
    queryFn: fetchCocktails,
  });

  return {
    cocktails: data,
    isCocktailsFetched: isFetched,
  };
};

export default useCocktails
