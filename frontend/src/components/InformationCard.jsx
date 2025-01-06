import React from "react";

const InformationCard = ({ stock }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden m-4 transform transition duration-500 hover:scale-105">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="w-full h-48 object-cover md:w-48" src={stock.crop.cropImage} alt={stock.crop.cropName} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{stock.crop.cropName}</div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">{stock.crop.variety}</p>
          <p className="mt-2 text-gray-600"><strong>Planting Date:</strong> {new Date(stock.crop.plantingDate).toLocaleDateString()}</p>
          <p className="mt-2 text-gray-600"><strong>Harvest Date:</strong> {new Date(stock.crop.harvestDate).toLocaleDateString()}</p>
          <p className="mt-2 text-gray-600"><strong>Growth Stage:</strong> {stock.crop.growthStage}</p>
          <p className="mt-2 text-gray-600"><strong>Field Name:</strong> {stock.feild.feildName}</p>
          <p className="mt-2 text-gray-600"><strong>Location:</strong> {stock.feild.location}</p>
          <p className="mt-2 text-gray-600"><strong>Soil Type:</strong> {stock.feild.soilType}</p>
          <p className="mt-2 text-gray-600"><strong>Irrigation System:</strong> {stock.feild.irrigationSystem}</p>
          <p className="mt-2 text-gray-600"><strong>Quantity:</strong> {stock.crop.quantity} kg</p>
          <p className="mt-2 text-gray-600"><strong>Price:</strong> ₹{stock.crop.price} per kg</p>
          <p className="mt-2 text-gray-600"><strong>Stock:</strong> {stock.stock}</p>
        </div>
      </div>
    </div>
  );
};

export default InformationCard;
