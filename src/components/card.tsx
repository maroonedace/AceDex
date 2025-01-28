import { motion } from "motion/react";
import { Item } from "../models/item";
import { FC } from "react";

interface CardProps {
  item: Item;
  selectedItem: Item | null;
  setSelected: (item: Item) => void;
}

const Card: FC<CardProps> = ({ item, selectedItem, setSelected }) => {
  return (
    <motion.div
      animate={{ rotateY: item === selectedItem ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        onClick={() => setSelected(item)}
        className="justify-center flex flex-col group cursor-pointer backface-hidden"
      >
        <img className="rounded-t-2xl" src={item.image} width={300} />
        <div className="p-4 bg-gray-200 rounded-b-2xl">
          <p className="font-bold text-xl">{item.name}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
