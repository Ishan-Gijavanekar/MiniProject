import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Maximize, Droplet, Mountain, User } from 'lucide-react';
import { useFarmStore } from '../store/farmStore';

const FieldDetails = () => {
  const { id } = useParams();
  const { fields, getFieldById, isLoading, error } = useFarmStore();

  useEffect(() => {
    getFieldById(id);
  }, [id, getFieldById]);

  console.log(fields)

  const field = fields.find((f) => f._id === id);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (!field) return <div>Field not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">{field.feildName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-blue-500" />
            <span className="text-gray-700">Location: {field.location}</span>
          </div>
          <div className="flex items-center">
            <Maximize className="w-6 h-6 mr-2 text-blue-500" />
            <span className="text-gray-700">Size: {field.size} acres</span>
          </div>
          <div className="flex items-center">
            <Mountain className="w-6 h-6 mr-2 text-blue-500" />
            <span className="text-gray-700">Soil Type: {field.soilType}</span>
          </div>
          <div className="flex items-center">
            <Droplet className="w-6 h-6 mr-2 text-blue-500" />
            <span className="text-gray-700">Irrigation System: {field.irrigationSystem}</span>
          </div>
          <div className="flex items-center">
            <User className="w-6 h-6 mr-2 text-blue-500" />
            <span className="text-gray-700">Farmer ID: {field.farmerId}</span>
          </div>
          <div className="col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Crops:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {field.crops.map((crop) => (
                <li key={crop} className="text-gray-700">{crop}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldDetails;
