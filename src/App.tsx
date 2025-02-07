import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/card";
import { Recipe } from "./models/recipe";
import Modal from "./components/modal";
import { cocktailRecipes } from "./models/cocktails";
import { core } from "@tauri-apps/api";

type Data = {
  id: number;
};

const App = () => {
  const [selectedItem, setSelectedItem] = useState<Recipe | null>(null);

  const [data, setData] = useState<Data[] | null>(null);

  useEffect(() => {
    const getData = () => {

      const banana = core.invoke("get_data")
      console.log(banana)
    };

    getData()
  }, []);

  const onCardClick = (recipe: Recipe) => {
    setSelectedItem(recipe);
  };

  const onModalClose = () => {
    setSelectedItem(null);
  };

  return (
    <div className="flex p-8 justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cocktailRecipes.map((cocktail) => (
          <Card
            key={cocktail.id}
            recipe={cocktail}
            selectedRecipe={selectedItem}
            onClick={onCardClick}
          />
        ))}
      </div>
      <Modal selectedRecipe={selectedItem} onClose={onModalClose} />
    </div>
  );
};

export default App;
