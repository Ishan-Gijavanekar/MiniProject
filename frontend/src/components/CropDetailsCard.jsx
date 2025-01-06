import React, { useEffect, useState } from 'react';
import { useCropStore } from '../store/cropStore'; // Adjust import path according to your project structure
import { useParams } from 'react-router-dom';
import { MapPin, Maximize, Droplet, Mountain } from 'lucide-react';

const CropDetails = () => {
  const { id } = useParams();
  const { getCropById, isLoading, error } = useCropStore();
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cropData = await getCropById(id);
      setCrop(cropData);
    };

    fetchData();
  }, [id, getCropById]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!crop) return <div>Crop not found</div>;

  return (
    <div className="w-full max-w-3xl p-5 mt-5 mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="md:flex">
        <img
          src={crop.cropImage || '/defaultPlant.jpg'}
          alt={crop.cropName || 'Unknown Crop'}
          className="w-full h-64 md:w-1/2 object-cover mb-6 md:mb-0 rounded-lg"
        />
        <div className="p-4 md:w-1/2 md:pl-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{crop.cropName}</h2>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <span><strong>Variety:</strong> {crop.variety}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Maximize className="w-4 h-4 mr-2 text-gray-400" />
              <span><strong>Planting Date:</strong> {new Date(crop.plantingDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Droplet className="w-4 h-4 mr-2 text-gray-400" />
              <span><strong>Harvest Date:</strong> {new Date(crop.harvestDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mountain className="w-4 h-4 mr-2 text-gray-400" />
              <span><strong>Growth Stage:</strong> {crop.growthStage}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Maximize className="w-4 h-4 mr-2 text-gray-400" />
              <span><strong>Quantity:</strong> {crop.quantity}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Droplet className="w-4 h-4 mr-2 text-gray-400" />
              <span><strong>Price:</strong> {crop.price}</span>
            </div>
          </div>
          {crop.feildId && (
            <>
              <h3 className="text-xl font-semibold text-gray-900 mt-6">Field Details</h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span><strong>Field Name:</strong> {crop.feildId.feildName}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span><strong>Location:</strong> {crop.feildId.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Maximize className="w-4 h-4 mr-2 text-gray-400" />
                  <span><strong>Size:</strong> {crop.feildId.size} acres</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Droplet className="w-4 h-4 mr-2 text-gray-400" />
                  <span><strong>Soil Type:</strong> {crop.feildId.soilType}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Droplet className="w-4 h-4 mr-2 text-gray-400" />
                  <span><strong>Irrigation System:</strong> {crop.feildId.irrigationSystem}</span>
                </div>
              </div>
            </>
          )}
          {crop.farmerId && (
            <>
              <h3 className="text-xl font-semibold text-gray-900 mt-6">Farmer Details</h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span><strong>Farmer Name:</strong> {crop.farmerId.fullName}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span><strong>Email:</strong> {crop.farmerId.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Maximize className="w-4 h-4 mr-2 text-gray-400" />
                  <span><strong>Contact:</strong> {crop.farmerId.contactInfo || 'N/A'}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropDetails;
