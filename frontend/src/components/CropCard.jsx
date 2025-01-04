import React from 'react';
import { Leaf, Edit2, Eye } from 'lucide-react';

// Adjust import paths according to your project structure
import { Button } from './path-to-your-ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './path-to-your-ui/card';

const CropCard = ({ imageSrc, cropName, onUpdate, onViewDetails }) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="relative w-full h-48">
        <img
          src={imageSrc}
          alt={cropName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="flex items-center text-xl font-semibold text-gray-900">
          <Leaf className="w-5 h-5 mr-2 text-green-500" />
          {cropName}
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
      </div>
    </div>
  );
};

export default CropCard;