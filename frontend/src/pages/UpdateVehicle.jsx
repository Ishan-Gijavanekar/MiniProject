import React, { useState, useEffect } from 'react';
import { useVechileStore } from '../store/vechileStore';
import { useParams } from 'react-router-dom';

const EditVechileForm = () => {

    const {id} = useParams()

  const { getVechilesById, updateVechile, isLoading } = useVechileStore();
  const [vehicleData, setVechileData] = useState({
    vehicleNumber: '',
    vehicleName: '',
    cost: '',
    capacity: '',
  });

  useEffect(() => {
    async function fetchVechile() {
      const vechile = await getVechilesById(id);
      setVechileData(vechile);
    }
    fetchVechile();
  }, [id, getVechilesById]);

  //console.log(vehicleData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVechileData({
      ...vehicleData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateVechile(id, vehicleData);
    alert('Vechile Updated Successfully');
  };

  return (
    <div className="edit-vechile-form min-h-screen bg-white transition-all duration-300">
      {/* Main content */}
      <div className="pt-4 max-w-[2800px] mx-auto">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Form header */}
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <div className="h-6 bg-[#3498db]"></div>
              <h2 className="text-xl font-semibold text-[#3498db]">Edit Vechile</h2>
            </div>
            <p className="text-gray-500 mt-1 text-sm">Update your vechile details below</p>
          </div>

          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="vechileName" className="block text-sm font-medium text-gray-700 mb-1">
                  Vechile Name
                </label>
                <input
                  type="text"
                  id="vechileName"
                  name="vechileName"
                  value={vehicleData.vehicleName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] outline-none transition text-sm"
                  placeholder="Enter vechile name"
                  required
                />
              </div>

              <div>
                <label htmlFor="vechileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Vechile Number
                </label>
                <input
                  type="text"
                  id="vechileNumber"
                  name="vechileNumber"
                  value={vehicleData.vehicleNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] outline-none transition text-sm"
                  placeholder="Enter vechile number"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
                  Cost
                </label>
                <input
                  type="number"
                  id="cost"
                  name="cost"
                  value={vehicleData.cost}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] outline-none transition text-sm"
                  placeholder="Enter cost"
                  required
                />
              </div>

              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={vehicleData.capacity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] outline-none transition text-sm"
                  placeholder="Enter capacity"
                  required
                />
              </div>
              </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-[#3498db] text-white rounded-md hover:bg-[#2980b9] transition-all duration-300 text-sm"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Vechile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditVechileForm;

