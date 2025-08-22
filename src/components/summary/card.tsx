import React from "react";

type TCard = {
  title: string;
  extraInfo: string | number;
  count: number;
};

const Card: React.FC<TCard> = ({ title, extraInfo, count }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-2xl font-bold text-gray-900 text-center">{count}</p>
      <p className="text-sm text-gray-500 text-center">{title}</p>
      <p className="text-sm text-gray-500 text-center">{extraInfo}</p>
    </div>
  );
};

export default Card;
