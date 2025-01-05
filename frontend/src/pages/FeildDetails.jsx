import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Maximize, Droplet, Mountain, User } from 'lucide-react';
import { useFarmStore } from '../store/farmStore';
import CropCard from '../components/CropCard';

const FieldDetails = () => {
  const { id } = useParams();
  const { getFieldById, isLoading, error } = useFarmStore();
  const [field, setField] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fieldData = await getFieldById(id);
      setField(fieldData);
    };

    fetchData();
  }, [id, getFieldById]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (!field) return <div>Field not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">{field.feildName || 'Unknown Field'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-blue-500" />
            <span className="text-gray-700">Location: {field.location || 'Unknown'}</span>
          </div>
          <div className="flex items-center">
            <Maximize className="w-6 h-6 mr-2 text-blue-500" />
            <span className="text-gray-700">Size: {field.size || 'Unknown'} acres</span>
          </div>
          <div className="flex items-center">
            <Mountain className="w-6 h-6 mr-2 text-blue-500" />
            <span className="text-gray-700">Soil Type: {field.soilType || 'Unknown'}</span>
          </div>
          <div className="flex items-center">
            <Droplet className="w-6 h-6 mr-2 text-blue-500" />
            <span className="text-gray-700">Irrigation System: {field.irrigationSystem || 'Unknown'}</span>
          </div>
          <div className="flex items-center">
            <User className="w-6 h-6 mr-2 text-blue-500" />
            <span className="text-gray-700">Farmer ID: {field.farmerDetails?.fullName || 'Unknown'}</span>
          </div>
          <div className="col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Crops:</h3>
            <div className="space-y-4">
              {field.crops && field.crops.length > 0 ? (
                field.crops.map((id) => (
                  <CropCard key={id} id={id} />
                ))
              ) : (
                <p>No crops available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldDetails;
