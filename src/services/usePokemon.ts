import { useQuery } from "@tanstack/react-query";
import { fetchPokemonByGeneration } from "../api/api";

const usePokemon = (generation: string) => {
  const queryKey = [
    "pokemon",
    generation
  ]

  const { data, isFetched } = useQuery({
    queryKey,
    queryFn: () => fetchPokemonByGeneration(generation),
  });

  return {
    pokemon: data,
    isPokemonFetched: isFetched,
  };
};

export default usePokemon;