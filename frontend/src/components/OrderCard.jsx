import React from 'react';
import { Truck, Package, User, Crop, IndianRupee } from 'lucide-react';

const IndustrialOrderCard = ({ order }) => {
  return (
    <div className="w-full max-w-md bg-gray-100 rounded-lg shadow-lg overflow-hidden border-2 border-gray-300">
      <div className="relative h-48 w-full">
        <img
          src={order.crop.cropImage}
          alt={order.crop.cropName}
          className="rounded-t-lg object-cover w-full h-full"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Order Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <User className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">{order.user.fullName}</span>
          </div>
          <div className="flex items-center">
            <Crop className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">{order.crop.cropName}</span>
          </div>
          <div className="flex items-center">
            <Truck className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">{order.transport.transportName}</span>
          </div>
          <div className="flex items-center">
            <Truck className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">{order.vechile.vehicleName}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700">{order.vechile.vehicleNumber}</span>
          </div>
          <div className="flex items-center col-span-2">
            <Package className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Quantity: {order.quantity}</span>
          </div>
          <div className="flex items-center col-span-2">
            <IndianRupee className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Total Cost: {order.price}</span>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-200">
        <button
          onClick={() => onView(order.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex justify-center items-center"
        >
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default IndustrialOrderCard;
