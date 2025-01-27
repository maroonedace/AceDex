import { motion } from "motion/react";
import { Item } from "../models/item";
import { FC } from "react";

interface CardProps {
  item: Item;
  setSelected: (item: Item) => void;
}

const Card: FC<CardProps> = ({ item, setSelected }) => {
  return (
    <motion.div
      layoutId={`${item.value}-picture`}
      whileHover={{ scale: 1.1 }}
      onClick={() => setSelected(item)}
      className="relative justify-center flex flex-col group cursor-pointer"
    >
      <img className="rounded-t-2xl" src={item.image} width={300} />
      <div className="p-4 bg-gray-200 rounded-b-2xl">
        <motion.p
          className="font-bold text-xl"
          layoutId={`${item.value}-title`}
        >
          {item.name}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Card;
