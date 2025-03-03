import usePokemon from "../services/usePokemon";
import { useState } from "react";
import PokemonCard from "./pokemonCard";

const Pokemon = () => {
  const [index, setIndex] = useState(0);

  const { pokemon } = usePokemon(index);

  return (
    <div className="flex flex-col p-8 justify-center w-full gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {pokemon?.map((poke) => {
          return <PokemonCard key={poke.id} pokemon={poke} />;
        })}
      </div>
      <div className="flex gap-4">
        <button
          className="cursor-pointer disabled:cursor-auto border rounded-lg p-2 hover:bg-gray-400 disabled:opacity-50 disabled:hover:bg-inherit"
          disabled={index === 0}
          onClick={() => setIndex((prev) => prev - 1)}
        >
          Prev
        </button>
        <button
          className="cursor-pointer border rounded-lg p-2 hover:bg-gray-400"
          onClick={() => setIndex((prev) => prev + 1)}
        >
          Next
        </button>
        <p>Current Index: {index + 1}</p>
      </div>
    </div>
  );
};

export default Pokemon;
