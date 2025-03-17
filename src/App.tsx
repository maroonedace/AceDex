import "./App.css";
import { ChangeEvent, FC, useEffect, useState } from "react";
import usePokemon from "./services/usePokemon";
import PokemonCard from "./pokemon/pokemonCard";
import Skeleton from "./pokemon/skeleton";
import { Pokemon } from "./models/pokemon";

const App: FC = () => {
  const { pokemon, isPokemonFetched } = usePokemon(null);

  const [input, setInput] = useState("");

  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[] | undefined>(
    pokemon
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (pokemon?.length) {
      if (input?.length) {
        setFilteredPokemon(
          pokemon?.filter((poke) =>
            poke.name.toLowerCase().includes(input.toLowerCase())
          )
        );
      } else {
        setFilteredPokemon(pokemon);
      }
    } else {
      setFilteredPokemon([]);
    }
  }, [input, pokemon]);

  return (
    <div className="flex flex-col p-8 justify-center items-center w-full gap-4 bg-gray-900">
      <div>
        <input
          className="bg-white rounded-lg px-2"
          onChange={handleInput}
          type="text"
          placeholder="Search Pokemon..."
          value={input}
        />
      </div>
      <div className="grid grid-cols-3 gap-1">
        {isPokemonFetched &&
          filteredPokemon?.map((poke) => {
            return <PokemonCard key={poke.id} pokemon={poke} />;
          })}
        {!isPokemonFetched && <Skeleton numberOfSkeletons={24} />}
      </div>
    </div>
  );
};

export default App;
