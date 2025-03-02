import { motion } from "motion/react";
import usePokemon from "../services/usePokemon";

const Pokemon = () => {
  const { pokemon } = usePokemon();

  return (
    <div className="flex p-8 gap-4 flex-wrap justify-center">
      {pokemon?.map((poke) => {
        const name = poke.name[0].toUpperCase() + poke.name.slice(1);
        return (
          <motion.div initial={{scale: 1}} whileHover={{scale: 1.1}}  className="border rounded-2xl h-40 w-40 flex flex-col items-center justify-center cursor-pointer">
            <img src={poke.sprites.front_default} alt={poke.name} />
            <p>{name}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Pokemon;
