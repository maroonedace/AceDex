import "./App.css";
import { FC, useState } from "react";
import Card from "./components/card";
import { Recipe } from "./models/recipe";
import Modal from "./components/modal";
import useRecipes from "./services/useRecipes";

const App: FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const { recipes, isRecipesFetched } = useRecipes();

  const onCardClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const onModalClose = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="flex p-8 justify-center">
      {isRecipesFetched && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes?.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                recipe={recipe}
                selectedRecipe={selectedRecipe}
                onClick={onCardClick}
              />
            );
          })}
        </div>
      )}
      <Modal selectedRecipe={selectedRecipe} onClose={onModalClose} />
    </div>
  );
};

export default App;
