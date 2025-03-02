import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from "../api/api";

const usePokemon = (index: number) => {
  const queryKey = [
    "pokemon",
    index
  ]

  const { data, isFetched } = useQuery({
    queryKey,
    queryFn: () => fetchPokemon(index),
  });

  return {
    pokemon: data,
    isPokemonFetched: isFetched,
  };
};

export default usePokemon;