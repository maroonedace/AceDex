import usePokemon from "../services/usePokemon";

const Pokemon = () => {
  const { pokemon } = usePokemon();

  return <div className="flex p-8 justify-center"></div>;
};

export default Pokemon;
