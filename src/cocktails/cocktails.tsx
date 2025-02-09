import { useState } from "react";
import Modal from "../components/modal";
import { Recipe } from "../models/recipe";
import Card from "../components/card";
import useCocktails from "../services/useCocktails";

const Cocktails = () => {
  const [selectedCocktail, setSelectedCocktail] = useState<Recipe | null>(null);

  const { cocktails, isCocktailsFetched } = useCocktails();

  const onCardClick = (cocktail: Recipe) => {
    setSelectedCocktail(cocktail);
  }

  const onModalClose = () => {
    setSelectedCocktail(null);
  }

  return (
    <div className="flex p-8 justify-center">
      {isCocktailsFetched && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cocktails?.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                recipe={recipe}
                selectedRecipe={selectedCocktail}
                onClick={onCardClick}
              />
            );
          })}
        </div>
      )}
      <Modal selectedRecipe={selectedCocktail} onClose={onModalClose} />
    </div>
  );
};

export default Cocktails;
