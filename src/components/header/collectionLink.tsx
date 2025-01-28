import { FC } from "react";
import { Link } from "react-router";
import { CollectionLinkContent } from "./models/navigation";

interface CollectionLinkProps {
  link: CollectionLinkContent;
  onClick: () => void;
}

const CollectionLink: FC<CollectionLinkProps> = ({ link, onClick }) => {
  return (
    <Link
      className={`flex items-center gap-2 pl-4 pr-8 py-2 justify-start rounded-2xl hover:bg-gray-700`}
      onClick={onClick}
      to={link.url}
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <img src={link.icon} alt={link.text} />
      </div>
      {link.text}
    </Link>
  );
};

export default CollectionLink;
