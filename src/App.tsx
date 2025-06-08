import "./App.css";
import { ChangeEvent, FC, useEffect, useState } from "react";
import usePokemon from "./services/usePokemon";
import PokemonCard from "./pokemon/pokemonCard";
import Skeleton from "./pokemon/skeleton";
import { Pokemon } from "./models/pokemon";
import Footer from "./components/footer/footer";

const App: FC = () => {
  const { pokemon, isPokemonFetched } = usePokemon(null);

  const [input, setInput] = useState("");

  const [isScrollUpVisible, setIsScrollUpVisible] = useState(false);

  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[] | undefined>(
    pokemon
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 400) {
      setIsScrollUpVisible(true);
    } else {
      setIsScrollUpVisible(false);
    }
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollUpVisible]);

  return (
    <div className="flex flex-col w-full relative">
      <div className="flex flex-col p-8 items-center gap-4 bg-gray-900 min-h-[calc(100vh-120px)]">
        <h2 className="text-xl font-bold text-white text-center">
          Welcome to Acedex!
        </h2>
        <p className="text-white text-center">
          This application will allow you to view every Pokémon in a TCG format.
          Please use the search bar to filter Pokémon.
        </p>
        <div className="flex flex-col gap-2 relative justify-center">
          <input
            className="bg-white rounded-lg py-2 pl-2 pr-10 text-gray-800"
            onChange={handleInput}
            type="text"
            aria-label="Search Pokémon"
            placeholder="Search Pokémon..."
            value={input}
          />
          {input?.length > 0 && (
            <i
              className="material-icons absolute right-1 cursor-pointer text-gray-900 hover:bg-gray-100 rounded-full p-1"
              onClick={() => setInput("")}
              aria-label="Clear search input"
            >
              close
            </i>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {isPokemonFetched &&
            filteredPokemon?.map((poke) => {
              return <PokemonCard key={poke.id} pokemon={poke} />;
            })}
          {!isPokemonFetched && <Skeleton numberOfSkeletons={24} />}
        </div>
      </div>
      <button
        onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
        className={`flex fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full z-10 cursor-pointer hover:bg-gray-700 transition-opacity duration-300 ${
          isScrollUpVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <i className="material-icons">arrow_upward</i>
      </button>
      <Footer />
    </div>
  );
};

export default App;
