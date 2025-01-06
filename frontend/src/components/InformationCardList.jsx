import React from "react";
import InformationCard from "../components/InformationCard";

const InformationCardList = ({ stocks }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {stocks.map((stock) => (
        <InformationCard key={stock._id} stock={stock} />
      ))}
    </div>
  );
};

export default InformationCardList;
