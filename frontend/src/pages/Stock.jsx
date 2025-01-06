import React, { useEffect } from "react";
import { useCropStore } from "../store/cropStore";
import InformationCardList from "../components/InformationCardList";

const Stock = () => {
  const { getAvailableStock, stocks, isLoading } = useCropStore();

  console.log(stocks)

  useEffect(() => {
    getAvailableStock();
  }, [getAvailableStock]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Available Stock</h1>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <InformationCardList stocks={stocks} />
      )}
    </div>
  );
};

export default Stock;
