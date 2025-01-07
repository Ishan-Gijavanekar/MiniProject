import React from 'react';
import { Building2, MapPin, Plus, Eye, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyDetailsCard = ({ transport }) => {

    const navigate  = useNavigate()


    const onAddVehicle = () => {
      navigate(`/homepageTransport/add-vechile/${transport._id}`)
    }
    
    const onViewVehicles = () => { 
      navigate(`/homepageTransport/get-vechile/${transport._id}`)
    }
    const onViewDetails = () => { 

    }
  return (
    <div className="w-full m-5 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row">
        <div className="p-6 flex-grow">
          <h3 className="flex items-center text-xl font-semibold text-gray-900 mb-2">
            <Building2 className="w-6 h-6 mr-2 text-blue-500 flex-shrink-0" />
            <span className="truncate">{transport.transportName}</span>
          </h3>
          <p className="flex items-center text-sm text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
            <span className="truncate">{transport.BaseLocation}</span>
          </p>
        </div>
        <div className="p-4 sm:p-6 flex flex-row sm:flex-col justify-between sm:justify-center space-x-2 sm:space-x-0 sm:space-y-2 bg-gray-50 border-t sm:border-t-0 sm:border-l border-gray-200">
          <button
            onClick={onAddVehicle}
            className="flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            <Plus className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Add</span> Vehicle
          </button>
          <button
            onClick={onViewDetails}
            className="flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Eye className="w-4 h-4 mr-1 sm:mr-2" />
            View Details
          </button>
          <button
            onClick={onViewVehicles}
            className="flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
          >
            <Truck className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">View</span> Vehicles
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsCard;