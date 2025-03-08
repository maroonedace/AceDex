import { createRef, useEffect, useState } from "react";
import ArrowDropdownSvg from "../../../assets/svg/navigation/arrowDropdown.svg";

const Collection = () => {
  const collectionRef = createRef<HTMLDivElement>();
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);

  const toggleCollection = () => {
    setIsCollectionOpen(!isCollectionOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        collectionRef.current &&
        !collectionRef.current.contains(event.target as Node)
      ) {
        setIsCollectionOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [collectionRef]);

  return (
    <div className="relative" ref={collectionRef}>
      <button
        onClick={toggleCollection}
        className={`flex text-sm gap-2 items-center hover:bg-gray-700 px-4 py-2 rounded-2xl cursor-pointer ${
          isCollectionOpen ? "bg-gray-700" : ""
        }`}
      >
        Collection
        <img
          className={`${isCollectionOpen ? "rotate-180" : ""}`}
          src={ArrowDropdownSvg}
        />
      </button>
    </div>
  );
};

export default Collection;
