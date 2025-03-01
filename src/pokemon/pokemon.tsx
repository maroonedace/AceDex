import usePokemon from "../services/usePokemon";

const Pokemon = () => {
  const { pokemon } = usePokemon();

  return (
    <div className="flex p-8 gap-4 flex-wrap justify-center">
      {pokemon?.map((poke) => {
        const name = poke.name[0].toUpperCase() + poke.name.slice(1);
        return (
          <div className="border rounded-2xl h-40 w-40 flex flex-col items-center justify-center">
            <img src={poke.sprites.front_default} alt={poke.name} />
            <p>{name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Pokemon;
