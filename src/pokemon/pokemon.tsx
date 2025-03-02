import { motion } from "motion/react";
import usePokemon from "../services/usePokemon";
import { useState } from "react";

const Pokemon = () => {

  const [index, setIndex] = useState(0);

  const { pokemon } = usePokemon(index);


  return (
    <div className="flex flex-col p-8 justify-center w-full gap-4">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {pokemon?.map((poke) => {
          const name = poke.name[0].toUpperCase() + poke.name.slice(1);
          return (
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="border rounded-2xl h-40 w-40 flex flex-col items-center justify-center cursor-pointer"
            >
              <img src={poke.sprites.front_default} alt={poke.name} />
              <p>{name}</p>
            </motion.div>
          );
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
