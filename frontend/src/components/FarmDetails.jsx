import React from 'react';
import FieldDetails from './FieldDetails';

const mockFieldData = {
  feildName: "Sunny Acres",
  location: "Kansas",
  size: 50,
  soilType: "Loamy",
  irrigationSystem: "Yes",
  crops: ["Corn", "Wheat", "Soybeans"],
  farmerId: "12345"
};

const FarmDetails = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <FieldDetails field={mockFieldData} />
    </div>
  );
};

export default FarmDetails;
