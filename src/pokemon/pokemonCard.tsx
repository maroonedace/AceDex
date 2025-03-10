import { Pokemon } from "../models/pokemon";
import { FC, useState } from "react";
import {
  capitalize,
  convertKgToLbs,
  convertMeterToFeetAndInches,
} from "../utils/converter";
import { PokemonColors } from "../models/colorConfig";
import { CardSizes } from "../models/sizeConfig";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const setPokemonCardBg = (type: string[]) => {
  const firstColor = PokemonColors[type[0]];

  if (type.length === 1) {
    return {
      cardBg: `bg-gradient-to-t ${firstColor.primaryTo} ${firstColor.secondaryFrom}`,
      imageBg: `bg-gradient-to-t ${firstColor.secondaryTo} ${firstColor.tertiaryFrom}`,
      textBg: `bg-gradient-to-t ${firstColor.tertiaryTo} ${firstColor.primaryFrom}`,
    };
  }
  const secondColor = PokemonColors[type[1]];

  return {
    cardBg: `bg-gradient-to-t ${firstColor.primaryTo} ${secondColor.primaryFrom}`,
    imageBg: `bg-gradient-to-t ${firstColor.secondaryTo} ${secondColor.secondaryFrom}`,
    textBg: `bg-gradient-to-t ${firstColor.tertiaryTo} ${secondColor.tertiaryFrom}`,
  };
};

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  const name = capitalize(pokemon.name);
  const colors = setPokemonCardBg(pokemon.pokemon_type);

  const weight = convertKgToLbs(pokemon.weight);
  const { feet, inches } = convertMeterToFeetAndInches(pokemon.height);

  const handleImageLoaded = () => {
    setHasImageLoaded(true);
  };
  return (
    <div
      className={`rounded-lg ${CardSizes["xs"].height} ${CardSizes["xs"].width} p-2 bg-card-background`}
    >
      <div
        className={`flex flex-col p-2 ${colors.cardBg} h-full rounded-lg gap-2`}
      >
        <div className="flex justify-between items-center">
          <p className="font-medium text-sm">{name}</p>
          <div className="flex gap-2">
            <p
              className={`text-white text-sm ${
                PokemonColors[pokemon.pokemon_type[0]].secondaryBg
              } border rounded-lg p-1`}
            >
              {capitalize(pokemon.pokemon_type[0])}
            </p>
            {pokemon.pokemon_type[1] && (
              <p
                className={`text-white text-sm ${
                  PokemonColors[pokemon.pokemon_type[1]].secondaryBg
                } border rounded-lg p-1`}
              >
                {capitalize(pokemon.pokemon_type[1])}
              </p>
            )}
          </div>
        </div>
        <div>
          <div
            className={`flex justify-center border border-gray-700 border-b-0 ${colors.imageBg} relative`}
          >
            {!hasImageLoaded && <div className="animate-pulse" />}
            {pokemon.evolves_from.name.length > 0 && (
              <div className="absolute w-full left-2 top-2">
                <div className="w-10 h-10 bg-white">
                  <img
                    className="w-full h-full"
                    src={pokemon.evolves_from.image_url}
                    alt={pokemon.evolves_from.name}
                  />
                </div>
              </div>
            )}
            <img
              onLoad={handleImageLoaded}
              src={pokemon.image_url}
              alt={pokemon.name}
            />
          </div>
          <div
            className={`flex justify-center items-center border border-gray-700 rounded-b-lg py-1 bg-white gap-1`}
          >
            <div className="flex gap-1">
              <p className="text-[8px]">No. {pokemon.id}</p>
              <p className="text-[8px]">{pokemon.species}</p>
            </div>
            <div className="flex gap-1">
              <p className="text-[8px]">
                HT: {feet}' {inches}"
              </p>
              <p className="text-[8px]">WT: {weight.toFixed(1)} lbs</p>
            </div>
          </div>
        </div>
        <div className="p-2 bg-white rounded-lg border border-gray-700">
          <p className="text-xs px-2">{pokemon.flavor_text}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
