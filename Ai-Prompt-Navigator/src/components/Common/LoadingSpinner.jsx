import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
        <div className="absolute w-full h-full rounded-full border-4 border-b-transparent border-pink-500 animate-spin-reverse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
