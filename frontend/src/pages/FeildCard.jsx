import React from 'react';
import { MapPin, Maximize, Droplet, Mountain, Edit2, Trash2, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useFarmStore } from '../store/farmStore';

const FieldCard = ({ field }) => {

  const navigate = useNavigate()

  const {deleteField} = useFarmStore()

  const onEdit = () => {
    // Edit logic here
    navigate(`/homepage/edit-field/${field._id}`)
  };

  const onDelete = async() => {
    // Delete logic here
    await deleteField(field._id)
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="p-4">
        <h2 className="flex items-center text-xl font-semibold text-gray-900">
          <MapPin className="w-5 h-5 mr-2 text-blue-500" />
          {field.location}
        </h2>
      </div>
      <div className="px-4 pb-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Maximize className="w-4 h-4 mr-2 text-gray-400" />
          <span>Size: {field.size}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Droplet className="w-4 h-4 mr-2 text-gray-400" />
          <span>Irrigation: {field.irrigationSystem}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Mountain className="w-4 h-4 mr-2 text-gray-400" />
          <span>Soil Type: {field.soilType}</span>
        </div>
      </div>
      <div className="flex justify-between p-4 border-t border-gray-200 space-x-2">
        <button
          onClick={onEdit}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
        >
          <Edit2 className="w-4 h-4 mr-2" />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </button>
        <Link to={`/homepage/feild/${field._id}`}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FieldCard;
