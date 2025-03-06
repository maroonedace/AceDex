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
            className="rounded-lg h-[350px] w-[250px] animate-pulse bg-gray-300"
          />
        );
      })}
    </>
  );
};

export default Skeleton;
