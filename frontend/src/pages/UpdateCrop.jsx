import React, { useEffect, useState } from 'react';
import { useSidebar } from '../customhooks/useSidebar';
import { useCropStore } from '../store/cropStore';
import { useParams } from 'react-router-dom';

export default function UpdateCropForm() {
  const { isOpen: isSidebarOpen } = useSidebar();
  const { id } = useParams();
  const { updateCrop, getCropById, isLoading, error } = useCropStore();

  const [cropName, setCropName] = useState('');
  const [variety, setVariety] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchCrop = async () => {
      const cropData = await getCropById(id);
      setCropName(cropData.cropName);
      setVariety(cropData.variety);
      setPlantingDate(new Date(cropData.plantingDate).toISOString().split('T')[0]);
      setHarvestDate(new Date(cropData.harvestDate).toISOString().split('T')[0]);
      setGrowthStage(cropData.growthStage);
      setQuantity(cropData.quantity);
      setPrice(cropData.price);
    };

    fetchCrop();
  }, [id, getCropById]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cropData = {
      cropName,
      variety,
      plantingDate,
      harvestDate,
      growthStage,
      quantity,
      price
    };

    await updateCrop(id, cropData);

    // Reset form fields
    setCropName('');
    setVariety('');
    setPlantingDate('');
    setHarvestDate('');
    setGrowthStage('');
    setQuantity('');
    setPrice('');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={`min-h-screen bg-white transition-all duration-300 ${isSidebarOpen ? 'ml-100' : 'ml-00'}`}>
      {/* Main content */}
      <div className="pt-4 max-w-[2800px] mx-auto">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Form header */}
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <div className="h-6 bg-[#2ECC71]"></div>
              <h2 className="text-xl font-semibold text-[#2ECC71]">Update Crop</h2>
            </div>
            <p className="text-gray-500 mt-1 text-sm">Enter your crop details below</p>
          </div>

          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Crop Name */}
              <div>
                <label htmlFor="cropName" className="block text-sm font-medium text-gray-700 mb-1">
                  Crop Name
                </label>
                <input
                  type="text"
                  id="cropName"
                  name="cropName"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter crop name"
                />
              </div>

              {/* Variety */}
              <div>
                <label htmlFor="variety" className="block text-sm font-medium text-gray-700 mb-1">
                  Variety
                </label>
                <input
                  type="text"
                  id="variety"
                  name="variety"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter variety"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Planting Date */}
              <div>
                <label htmlFor="plantingDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Planting Date
                </label>
                <input
                  type="date"
                  id="plantingDate"
                  name="plantingDate"
                  value={plantingDate}
                  onChange={(e) => setPlantingDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                />
              </div>

              {/* Harvest Date */}
              <div>
                <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Harvest Date
                </label>
                <input
                  type="date"
                  id="harvestDate"
                  name="harvestDate"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Growth Stage */}
              <div>
                <label htmlFor="growthStage" className="block text-sm font-medium text-gray-700 mb-1">
                  Growth Stage
                </label>
                <input
                  type="text"
                  id="growthStage"
                  name="growthStage"
                  value={growthStage}
                  onChange={(e) => setGrowthStage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter growth stage"
                />
              </div>

              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter quantity"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter price"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-white py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium h-10"
              >
                Update Crop
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
