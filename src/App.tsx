import "./App.css";
import { FC, useState } from "react";
import Card from "./components/card";
import { Recipe } from "./models/recipe";
import Modal from "./components/modal";
import useCocktails from "./services/useCocktails";

type Data = {
  id: number;
};

const App: FC = () => {
  const [selectedItem, setSelectedItem] = useState<Recipe | null>(null);

  const { cocktails, isCocktailsFetched } = useCocktails();

  const onCardClick = (recipe: Recipe) => {
    setSelectedItem(recipe);
  };

  const onModalClose = () => {
    setSelectedItem(null);
  };

  return (
    <div className="flex p-8 justify-center">
      {isCocktailsFetched && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cocktails?.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                recipe={recipe}
                selectedRecipe={selectedItem}
                onClick={onCardClick}
              />
            );
          })}
        </div>
      )}
      <Modal selectedRecipe={selectedItem} onClose={onModalClose} />
    </div>
  );
};

export default App;
