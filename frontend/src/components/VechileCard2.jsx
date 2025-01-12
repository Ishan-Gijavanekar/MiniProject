import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VehicleCard2 = ({ vehicle }) => {

  const navigate = useNavigate()

  return (
    <div className="w-full m-5 max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="relative w-full h-48">
        <img
          src={vehicle.image || '/defaultVechile.jpg'}
          alt={vehicle.vehicleName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          {vehicle.vehicleName}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Vehicle No: {vehicle.vehicleNumber}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Vehicle Capacity: {vehicle.capacity}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Cost per km (in Rupees): {vehicle.cost}
        </p>
      </div>
    </div>
  );
};

export default VehicleCard2;