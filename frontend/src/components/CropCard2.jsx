import React, { useEffect, useState } from 'react';
import { Leaf, Edit2, Eye, Trash2, IndianRupee, LeafIcon, Layers } from 'lucide-react'; // Import the Trash2 icon
import { useCropStore } from '../store/cropStore'; // Adjust import path according to your project structure
import { useNavigate } from 'react-router-dom';

const CropCard2 = ({ crop }) => {
  const { getCropByIdFromBody, isLoading, error } = useCropStore();

  const onUpdate = () => {
    // Update logic here
    navigate(`/homepage/update-details/${crop._id}`)
  };

  const onViewDetails = () => {
    navigate(`/homepage/crop-details/${crop._id}`)
    // View details logic here
  };

  const onDelete = () => {
    // Delete logic here
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (!crop) return <div>Crop not found</div>;

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="relative w-full h-48">
        <img
          src={crop.cropImage || '/defaultPlant.jpg'} // Provide a default image URL if cropImage is not available
          alt={crop.cropName || 'Unknown Crop'}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="flex items-center text-xl font-semibold text-gray-900">
          <Leaf className="w-5 h-5 mr-2 text-green-500" />
          {crop.cropName || 'Unknown Crop'}
        </h3>
      </div>
      <div className="p-4">
        <h3 className="flex items-center text-xl font-semibold text-gray-900">
          <Layers className="w-5 h-5 mr-2 text-green-500" />
          {crop.quantity || 'Unknown Crop'} kg.
        </h3>
      </div>
      <div className="p-4">
        <h3 className="flex items-center text-xl font-semibold text-gray-900">
          <IndianRupee className="w-5 h-5 mr-2 text-green-500" />
          Price per kg: {crop.price || 'Unknown Crop'}
        </h3>
      </div>
    </div>
  );
};

export default CropCard2;
