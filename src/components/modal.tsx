import { AnimatePresence, motion } from "motion/react";
import { FC } from "react";
import { Item } from "../models/item";

interface ModalProps {
  selectedItem: Item | null;
  setSelectedItem: (value: Item | null) => void;
}

const Modal: FC<ModalProps> = ({ selectedItem, setSelectedItem }) => {
  return (
    <AnimatePresence>
      {selectedItem && (
        <motion.div
          className="fixed inset-0 z-10 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0, rotateY: 0 }}
            animate={{ scale: 1, rotateY: 0 }}
            exit={{ scale: 0, rotateY: 180 }}
            transition={{ duration: 0.6 }}
            className="fixed bg-gray-300 bg-opacity-50 p-4 w-[90%] lg:w-[70%] xl:w-[50%] min-h-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col gap-4"
          >
            <h1 className="text-xl text-black font-bold">
              {selectedItem.name}
            </h1>
            <div className="flex gap-4">
              <img
                className="rounded-2xl"
                width={200}
                src={selectedItem.image}
              />
              <div className="flex flex-col">
                <h2 className="font-bold">Ingredients</h2>
                <ul className="list-disc list-inside">
                  {selectedItem.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p>{selectedItem.instructions}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
