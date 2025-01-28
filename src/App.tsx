import "./App.css";
import { useState } from "react";
import Card from "./components/card";
import { Cocktails } from "./models/cocktails";
import { Item } from "./models/item";
import Modal from "./components/modal";

const App = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <main>
      <div className="flex p-8 justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Cocktails.map((item) => (
          <Card key={item.id} item={item} selectedItem={selectedItem} setSelected={setSelectedItem} />
        ))}
        </div>
        <Modal selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      </div>
    </main>
  );
};

export default App;
