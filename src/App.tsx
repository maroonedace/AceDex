import "./App.css";
import { AnimatePresence, motion } from "motion/react";
import PinaColada from "./assets/pinaColada.jpg";
import { useState } from "react";

const App = () => {
  const [selectedId, setSelectedId] = useState(false);

  return (
    <main>
      <div className="flex p-8">
        <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() => setSelectedId(true)}
          className="relative justify-center flex group cursor-pointer"
        >
          <motion.div
            layoutId="pinaColadaTitle"
            className="group-hover:text-gray-400 top-12 absolute"
          >
            <h1 className="text-2xl group-hover:text-gray-400 text-transparent">
              Pina Colada
            </h1>
          </motion.div>
          <motion.div layoutId="pinaColada">
            <img className="rounded-2xl" src={PinaColada} width={200} />
          </motion.div>
        </motion.div>
        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setSelectedId(false)}
              exit={{ opacity: 0 }}
              className="fixed bg-gray-300 bg-opacity-50 p-4 w-[96%] h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl cursor-pointer"
            >
              <motion.div layoutId="pinaColadaTitle">
                <h1 className="text-2xl text-gray-400">Pina Colada</h1>
              </motion.div>
              <div className="flex">
                <motion.div layoutId="pinaColada">
                  <img className="rounded-2xl" src={PinaColada} width={200} />
                </motion.div>
              </div>
              <h2>Ingredients</h2>
              <ul>
                <li>2 oz White Rum</li>
                <li>3 oz Pineapple Juice</li>
                <li>1 oz Coconut Cream</li>
                <li>1 cup Ice</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default App;
