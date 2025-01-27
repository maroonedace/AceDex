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
        <div
          className="fixed w-full h-full z-10 cursor-pointer"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bg-gray-300 bg-opacity-50 p-4 w-[90%] lg:w-[70%] xl:w-[50%] min-h-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col gap-4"
          >
            <motion.h1
              className="text-xl text-black font-bold"
              layoutId={`${selectedItem.value}-title`}
            >
              {selectedItem.name}
            </motion.h1>
            <div className="flex gap-4">
              <motion.img
                layoutId={`${selectedItem.value}-picture`}
                className="rounded-2xl"
                src={selectedItem.image}
                width={200}
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
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
