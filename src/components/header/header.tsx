import { Link } from "react-router";
import Collection from "./collection/collection";

const Header = () => {

  return (
    <div>
      <header className="bg-gray-800 text-white p-4 flex gap-4 items-center">
        <Link className="text-2xl" to="/">MaroonedAce's Cookbook</Link>
        {/* <Collection /> */}
      </header>
    </div>
  );
};

export default Header;
