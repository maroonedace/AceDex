import { motion } from "motion/react";
import { Pokemon, PokemonColors } from "../models/pokemon";
import { FC } from "react";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const colors = PokemonColors[pokemon.pokemon_type];
  const weight = (pokemon.weight / 10) * 2.20462;


  const heightinInches = (pokemon.height / 10) * 39.37008;
  const feet = Math.floor(heightinInches / 12);
  const inches = Math.round(heightinInches % 12);
  const height = `${feet}'${inches}"`;
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className={`rounded-lg h-[250px] w-[200px] cursor-pointer p-2 bg-yellow-300`}
    >
      <div
        className={`flex flex-col p-2 ${colors.bg} h-full rounded-lg`}
      >
        <p className="font-medium">{name}</p>
        <div
          className={`flex justify-center border border-white ${colors.imagebg}`}
        >
          <img src={pokemon.image_url} alt={pokemon.name} />
        </div>
        <div
          className={`flex flex-col justify-center items-center border border-t-0 border-white rounded-b-lg p-1 ${colors.textbg} gap-1`}
        >
          <div className="flex gap-2">
            <p className="text-xs">No. {pokemon.id}</p>
            <p className="text-xs">{pokemon.species}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-xs">HT: {height}</p>
            <p className="text-xs">WT: {weight.toFixed(1)} lbs</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PokemonCard;
