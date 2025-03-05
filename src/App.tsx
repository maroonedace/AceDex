import "./App.css";
import { FC } from "react";
import usePokemon from "./services/usePokemon";
import PokemonCard from "./pokemon/pokemonCard";
import { useParams } from "react-router";

const App: FC = () => {

  const { generation } = useParams();

  const { pokemon } = usePokemon(generation || "generation-i");

  return (
    <div className="flex flex-col p-8 justify-center w-full gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {pokemon?.map((poke) => {
          return <PokemonCard key={poke.id} pokemon={poke} />;
        })}
      </div>
    </div>
  );
};

export default App;
