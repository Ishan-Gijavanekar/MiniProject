import React, { useState } from 'react';
import { useSidebar } from '../customhooks/useSidebar';
import { useFarmStore } from '../store/farmStore';

export default function AddFieldForm() {
  const { isOpen: isSidebarOpen } = useSidebar();
  const { addField } = useFarmStore();

  // State to hold form data
  const [fieldName, setFieldName] = useState('');
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [soilType, setSoilType] = useState('');
  const [irrigationSystem, setIrrigationSystem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fieldData = {
      feildName: fieldName,
      location,
      size: parseInt(size),
      soilType,
      irrigationSystem
    };

    console.log(fieldData)

    await addField(fieldData);

    //alert("Feild added successfully")

    // Reset form fields
    setFieldName('');
    setLocation('');
    setSize('');
    setSoilType('');
    setIrrigationSystem('');
  };

  return (
    <div className={`min-h-screen bg-white transition-all duration-300 ${isSidebarOpen ? 'ml-100' : 'ml-00'}`}>
      {/* Main content */}
      <div className="pt-4 max-w-[2800px] mx-auto">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Form header */}
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <div className="h-6 bg-[#2ECC71]"></div>
              <h2 className="text-xl font-semibold text-[#2ECC71]">Add Field</h2>
            </div>
            <p className="text-gray-500 mt-1 text-sm">Enter your field details below</p>
          </div>

          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Field Name */}
              <div>
                <label htmlFor="fieldName" className="block text-sm font-medium text-gray-700 mb-1">
                  Field Name
                </label>
                <input
                  type="text"
                  id="fieldName"
                  name='feildName'
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter field name"
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name='location'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter location"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Size */}
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Size (in acres)
                </label>
                <input
                  type="number"
                  id="size"
                  name='size'
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter field size"
                />
              </div>

              {/* Soil Type */}
              <div>
                <label htmlFor="soilType" className="block text-sm font-medium text-gray-700 mb-1">
                  Soil Type
                </label>
                <select
                  id="soilType"
                  value={soilType}
                  name='soilType'
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm bg-white"
                >
                  <option value="">Select soil type</option>
                  <option value="clay">Clay</option>
                  <option value="sandy">Sandy</option>
                  <option value="silt">Silt</option>
                  <option value="loam">Loam</option>
                  <option value="peat">Peat</option>
                </select>
              </div>
            </div>

            {/* Irrigation System */}
            <div>
              <label htmlFor="irrigation" className="block text-sm font-medium text-gray-700 mb-1">
                Irrigation System
              </label>
              <select
                id="irrigation"
                value={irrigationSystem}
                name='irrigationSystem'
                onChange={(e) => setIrrigationSystem(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm bg-white"
              >
                <option>Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-white py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium h-10"
              >
                Add Field
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
