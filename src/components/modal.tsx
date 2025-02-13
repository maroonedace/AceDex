import { AnimatePresence, motion } from "motion/react";
import { FC } from "react";
import { Recipe } from "../models/recipe";

import CloseSvg from "../assets/svg/navigation/close.svg";

interface ModalProps {
  selectedRecipe: Recipe | null;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ selectedRecipe, onClose }) => {
  return (
    <AnimatePresence>
      {selectedRecipe && (
        <motion.div
          className="fixed inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0, rotateY: 0 }}
            animate={{ scale: 1, rotateY: 0 }}
            exit={{ scale: 0, rotateY: 180 }}
            transition={{ duration: 0.6 }}
            className="fixed bg-gray-300 bg-opacity-50 p-4 w-[90%] lg:w-[70%] xl:w-[50%] min-h-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col gap-4"
          >
            <div className="flex justify-between">
              <h1 className="text-xl text-black font-bold">
                {selectedRecipe.name}
              </h1>
              <button
                className="hover:bg-gray-500 p-2 rounded-full cursor-pointer"
                onClick={onClose}
              >
                <img src={CloseSvg} />
              </button>
            </div>
            <div className="flex gap-4">
              <img
                className="rounded-2xl"
                width={200}
                src={selectedRecipe.image_url}
              />
              <div className="flex flex-col">
                <h2 className="font-bold">Ingredients</h2>
                <ul className="list-disc list-inside">
                  {selectedRecipe.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-bold">Instructions</h2>
              {selectedRecipe.instructions.map((instruction, index) => (
                <p key={instruction}>
                  {index + 1}. {instruction}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
