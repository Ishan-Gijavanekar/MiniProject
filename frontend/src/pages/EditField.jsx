import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFarmStore } from '../store/farmStore'; // Replace with the correct path

const EditField = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fields, updateField } = useFarmStore();

  const field = fields.find(field => field._id === id);

  const [feildName, setFeildName] = useState('');
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const [soilType, setSoilType] = useState('');
  const [irrigationSystem, setIrrigationSystem] = useState('');

  useEffect(() => {
    if (field) {
      setFeildName(field.feildName);
      setSize(field.size);
      setLocation(field.location);
      setSoilType(field.soilType);
      setIrrigationSystem(field.irrigationSystem);
    }
  }, [field]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateField(id, { feildName, size, location, soilType, irrigationSystem });
    navigate("/homepage/feilds")
  };

  return (
    <div className={`min-h-screen bg-white transition-all duration-300`}>
      {/* Main content */}
      <div className="pt-4 max-w-[2800px] mx-auto">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Form header */}
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <div className="h-6 bg-[#2ECC71]"></div>
              <h2 className="text-xl font-semibold text-[#2ECC71]">Edit Field</h2>
            </div>
            <p className="text-gray-500 mt-1 text-sm">Edit your field details below</p>
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
                  value={feildName}
                  onChange={(e) => setFeildName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter field name"
                  required
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
                  required
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
                  required
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
                  required
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
                required
              >
                <option value="">Select option</option>
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditField;
