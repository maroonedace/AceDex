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

  const hasPreviousEvolution = pokemon.previous_evolution.name.length > 0;

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
          {/* <div className="flex gap-2">
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
          </div> */}
        </div>
        <div>
          <div
            className={`flex justify-center border border-gray-700 border-b-0 ${colors.imageBg}`}
          >
            {!hasImageLoaded && <div className="animate-pulse" />}
            <img
              className="h-12 w-12"
              onLoad={handleImageLoaded}
              src={pokemon.image_url}
              alt={pokemon.name}
            />
          </div>
          {/* <div
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
          </div> */}
        </div>
        {/* <div
          className={`p-2 bg-white rounded-lg border border-gray-700 ${
            hasPreviousEvolution ? "h-full" : ""
          }`}
        >
          <div className={`${hasPreviousEvolution ? "border-b pb-2" : ""}`}>
            <p className="text-xs px-2">{pokemon.flavor_text}</p>
          </div>
          {hasPreviousEvolution && (
            <div className="p-2 flex flex-col items-center gap-2">
              <p className="text-xs text-center">
                Evolves from {capitalize(pokemon.previous_evolution.name)}
              </p>
              <img
                className="h-16 w-16"
                src={pokemon.previous_evolution.image_url}
                alt={pokemon.previous_evolution.name}
              />
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default PokemonCard;
