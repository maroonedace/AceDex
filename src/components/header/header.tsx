import { FC } from "react";
import { Link, useParams } from "react-router";

const pokemonGenerations = [
  {
    name: "Gen 1",
    url: "generation-i",
  },
  {
    name: "Gen 2",
    url: "generation-ii",
  },
  {
    name: "Gen 3",
    url: "generation-iii",
  },
  {
    name: "Gen 4",
    url: "generation-iv",
  },
  {
    name: "Gen 5",
    url: "generation-v",
  },
  {
    name: "Gen 6",
    url: "generation-vi",
  },
  {
    name: "Gen 7",
    url: "generation-vii",
  },
  {
    name: "Gen 8",
    url: "generation-viii",
  },
  {
    name: "Gen 9",
    url: "generation-ix",
  },
];

const Header: FC = () => {
  const { generation } = useParams();

  
  return (
    <div>
      <header className="bg-gray-800 text-white p-4 flex gap-4 items-center">
        {pokemonGenerations.map((gen) => (
          <Link
            key={gen.name}
            className={`flex items-center gap-2 pl-4 pr-8 py-2 justify-start rounded-2xl hover:bg-gray-700 ${
              generation === gen.url ? "bg-gray-700": ""}`}
            to={gen.url}
          >
            {gen.name}
          </Link>
        ))}
      </header>
    </div>
  );
};

export default Header;
