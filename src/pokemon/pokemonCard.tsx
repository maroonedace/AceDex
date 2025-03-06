import { motion } from "motion/react";
import { Pokemon } from "../models/pokemon";
import { FC } from "react";
import { captialize } from "../utils/converter";
import { PokemonColors } from "../models/colorConfig";


interface PokemonCardProps {
  pokemon: Pokemon;
}

const setPokemonCardBg = (type: string[]) => {
  const firstColor = PokemonColors[type[0]];

  if (type.length === 1) {
    return {
      cardBg: `bg-gradient-to-t ${firstColor.primaryTo} ${firstColor.secondaryFrom}`,
      imageBg: `bg-gradient-to-t ${firstColor.secondaryTo} ${firstColor.tertiaryFrom}`,
      textBg: `bg-gradient-to-t ${firstColor.tertiaryTo} ${firstColor.primaryFrom}`
    }
  }
  const secondColor = PokemonColors[type[1]];

  return ({
    cardBg: `bg-gradient-to-t ${firstColor.primaryTo} ${secondColor.primaryFrom}`,
    imageBg: `bg-gradient-to-t ${firstColor.secondaryTo} ${secondColor.secondaryFrom}`,
    textBg: `bg-gradient-to-t ${firstColor.tertiaryTo} ${secondColor.tertiaryFrom}`
  })

}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const name = captialize(pokemon.name);
  const colors = setPokemonCardBg(pokemon.pokemon_type)
  const weight = (pokemon.weight / 10) * 2.20462;

  const heightinInches = (pokemon.height / 10) * 39.37008;
  const feet = Math.floor(heightinInches / 12);
  const inches = Math.round(heightinInches % 12);
  const height = `${feet}'${inches}"`;
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className={`rounded-lg h-[350px] w-[250px] cursor-pointer p-2 bg-yellow-300`}
    >
      <div
        className={`flex flex-col p-2 ${colors.cardBg} h-full rounded-lg gap-2`}
      >
        <div className="flex justify-between items-center">
          <p className="font-medium">{name}</p>
          <div className="flex gap-2">
            <p className={`text-white ${PokemonColors[pokemon.pokemon_type[0]].secondaryBg} border rounded-lg p-1`}>
              {captialize(pokemon.pokemon_type[0])}
            </p>
            {pokemon.pokemon_type[1] && (
              <p className={`text-white ${PokemonColors[pokemon.pokemon_type[1]].secondaryBg} border rounded-lg p-1`}>
                {captialize(pokemon.pokemon_type[1])}
              </p>
            )}
          </div>
        </div>
        <div>
          <div
            className={`flex justify-center border border-white ${colors.imageBg}`}
          >
            <img src={pokemon.image_url} alt={pokemon.name} />
          </div>
          <div
            className={`flex flex-col justify-center items-center border border-t-0 border-white rounded-b-lg p-1 ${colors.textBg} gap-1`}
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
      </div>
    </motion.div>
  );
};

export default PokemonCard;
