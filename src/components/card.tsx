import { motion } from "motion/react";
import { Recipe } from "../models/recipe";
import { FC, useState } from "react";

interface CardProps {
  recipe: Recipe;
  selectedRecipe: Recipe | null;
  onClick: (recipe: Recipe) => void;
}

const Card: FC<CardProps> = ({ recipe, selectedRecipe, onClick }) => {
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setHasImageLoaded(true);
  };

  return (
    <motion.div
      animate={{ rotateY: recipe === selectedRecipe ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        onClick={() => onClick(recipe)}
        className="justify-center flex flex-col group cursor-pointer backface-hidden"
      >
        <div className="w-[200px] h-[300px] rounded-t-2xl bg-gray-300">
          {!hasImageLoaded && <div className="animate-pulse" />}
          <img
            className={`rounded-t-2xl ${hasImageLoaded ? "" : "hidden"}`}
            onLoad={handleImageLoaded}
            src={recipe.image_url}
            alt="Image of recipe"
          />
        </div>
        <div className="bg-gray-200 rounded-b-2xl">
          <p className="font-bold text-lg p-2">{recipe.name}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
