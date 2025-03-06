import "./App.css";
import { FC } from "react";
import usePokemon from "./services/usePokemon";
import PokemonCard from "./pokemon/pokemonCard";
import { useParams } from "react-router";
import Skeleton from "./pokemon/skeleton";

const App: FC = () => {

  const { generation } = useParams();

  const { pokemon, isPokemonFetched } = usePokemon(Number(generation) || 1);

  return (
    <div className="flex flex-col p-8 justify-center w-full gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {isPokemonFetched && pokemon?.map((poke) => {
          return <PokemonCard key={poke.id} pokemon={poke} />;
        })}
        {!isPokemonFetched && <Skeleton numberOfSkeletons={24} />}
      </div>
    </div>
  );
};

export default App;
