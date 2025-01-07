import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => {

  const navigate = useNavigate()

    const onUpdateDetails = () => {
      navigate(`/homepageTransport/update-vehicle/${vehicle._id}`)
    }

    const onDeleteVehicle = () => {

    }


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
        <div className="flex flex-col space-y-2">
          <button
            onClick={onUpdateDetails}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Edit className="w-4 h-4 mr-2" />
            Update Details
          </button>
          <button
            onClick={onDeleteVehicle}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Vehicle
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;