import { FC } from "react";

interface SkeletonProps {
  numberOfSkeletons: number;
}

const Skeleton: FC<SkeletonProps> = ({numberOfSkeletons}) => {
  return (
    <>
      {Array.from({ length: numberOfSkeletons }).map((_, index) => {
        return (
          <div
            key={index}
            className="rounded-lg h-[250px] w-[200px] animate-pulse bg-gray-300"
          />
        );
      })}
    </>
  );
};

export default Skeleton;
