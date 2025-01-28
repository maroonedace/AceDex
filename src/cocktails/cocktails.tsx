import { useState } from "react";
import Modal from "../components/modal";
import { Recipe } from "../models/recipe";
import { cocktailRecipes } from "../models/cocktails";
import Card from "../components/card";

const Cocktails = () => {
  const [selectedCocktail, setSelectedCocktail] = useState<Recipe | null>(null);

  const onCardClick = (cocktail: Recipe) => {
    setSelectedCocktail(cocktail);
  }

  const onModalClose = () => {
    setSelectedCocktail(null);
  }

  return (
    <div className="flex p-8 justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cocktailRecipes.map((cocktail) => (
          <Card
            key={cocktail.id}
            recipe={cocktail}
            selectedRecipe={selectedCocktail}
            onClick={onCardClick}
          />
        ))}
      </div>
      <Modal selectedRecipe={selectedCocktail} onClose={onModalClose} />
    </div>
  );
};

export default Cocktails;
