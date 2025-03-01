import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from "../api/api";

const usePokemon = () => {
  const queryKey = [
    "pokemon"
  ]

  const { data, isFetched } = useQuery({
    queryKey,
    queryFn: () => fetchPokemon(),
  });

  return {
    pokemon: data,
    isPokemonFetched: isFetched,
  };
};

export default usePokemon;