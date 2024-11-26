import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

const Shimmer = ({ count }) => {
  return (
    <SkeletonTheme baseColor="#2C2C31" highlightColor="#3F3F3F">
      <div className="flex flex-wrap gap-5 justify-center  px-5">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-[#1f1e24] w-48 rounded-lg cursor-pointer overflow-hidden pb-2 ml-4"
            >
              <Skeleton height={300} borderRadius={0} />
              <Skeleton width={100} height={30} />
              <Skeleton height={40} />
            </div>
          ))}
      </div>
    </SkeletonTheme>
  );
};

export default Shimmer;
