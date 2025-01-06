import React, { useEffect, useState } from 'react';
import { Leaf, Edit2, Eye, Trash2 } from 'lucide-react'; // Import the Trash2 icon
import { useCropStore } from '../store/cropStore'; // Adjust import path according to your project structure
import { useNavigate } from 'react-router-dom';

const CropCard = ({ id }) => {
  const { getCropByIdFromBody, isLoading, error } = useCropStore();
  const [crop, setCrop] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const cropData = await getCropByIdFromBody({ id });
      setCrop(cropData);
    };

    fetchData();
  }, [id, getCropByIdFromBody]);

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
      <div className="flex justify-between p-4 border-t border-gray-200">
        <button
          onClick={onUpdate}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Edit2 className="w-4 h-4 mr-2" />
          Update
        </button>
        <button
          onClick={onViewDetails}
          className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
        <button
          onClick={onDelete}
          className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default CropCard;
