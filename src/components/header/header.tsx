import { FC } from "react";
import { Link, useParams } from "react-router";

const pokemonGenerations = [
  {
    name: "Gen 1",
    url: "1",
  },
  {
    name: "Gen 2",
    url: "2",
  },
  {
    name: "Gen 3",
    url: "3",
  },
  {
    name: "Gen 4",
    url: "4",
  },
  {
    name: "Gen 5",
    url: "5",
  },
  {
    name: "Gen 6",
    url: "6",
  },
  {
    name: "Gen 7",
    url: "7",
  },
  {
    name: "Gen 8",
    url: "8",
  },
  {
    name: "Gen 9",
    url: "9",
  },
];

const Header: FC = () => {
  const { generation } = useParams();

  return (
    <header className="bg-gray-800 text-white p-4 sticky flex justify-between top-0 z-10">
      {pokemonGenerations.map((gen) => (
        <Link
          key={gen.name}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl hover:bg-gray-700 ${
            generation === gen.url ? "bg-gray-700" : ""
          }`}
          to={gen.url}
        >
          {gen.name}
        </Link>
      ))}
    </header>
  );
};

export default Header;
