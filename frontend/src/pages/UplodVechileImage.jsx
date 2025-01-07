import React, { useState } from 'react';
import { useSidebar } from '../customhooks/useSidebar';
import { useVechileStore } from '../store/vechileStore';

export default function UploadVehicleForm() {
  const { isOpen: isSidebarOpen } = useSidebar();
  const { uploadImage } = useVechileStore();

  // State to hold form data
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    const formData = {
      vehicleName,
      vehicleNumber,
      image
    };

    console.log(formData)

    if (!image || !vehicleName || !vehicleNumber) {
        alert("All fields are required");
        return;
      }

    await uploadImage(formData);

    // Reset form fields
    setVehicleName('');
    setVehicleNumber('');
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(reader.result); // Set the image as base64 string
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`min-h-screen bg-white transition-all duration-300 ${isSidebarOpen ? 'ml-100' : 'ml-00'}`}>
      {/* Main content */}
      <div className="pt-4 max-w-[2800px] mx-auto">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Form header */}
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <div className="h-6 bg-[#3498DB]"></div>
              <h2 className="text-xl font-semibold text-[#3498DB]">Upload Vehicle Image</h2>
            </div>
            <p className="text-gray-500 mt-1 text-sm">Enter your vehicle details below</p>
          </div>

          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Vehicle Name */}
              <div>
                <label htmlFor="vehicleName" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  id="vehicleName"
                  name="vehicleName"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#3498DB] focus:border-[#3498DB] outline-none transition text-sm"
                  placeholder="Enter vehicle name"
                />
              </div>

              {/* Vehicle Number */}
              <div>
                <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  id="vehicleNumber"
                  name="vehicleNumber"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#3498DB] focus:border-[#3498DB] outline-none transition text-sm"
                  placeholder="Enter vehicle number"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#3498DB] focus:border-[#3498DB] outline-none transition text-sm"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#3498DB] hover:bg-[#2980B9] text-white py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium h-10"
              >
                Upload Vehicle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
