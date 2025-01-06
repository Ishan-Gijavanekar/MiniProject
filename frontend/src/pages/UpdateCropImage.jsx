import React, { useEffect, useState } from 'react';
import { useSidebar } from '../customhooks/useSidebar';
import { useFarmStore } from '../store/farmStore';
import { useCropStore } from '../store/cropStore';

export function UploadCropImageForm() {
  const { isOpen: isSidebarOpen } = useSidebar();
  const { fetchFields, fields } = useFarmStore();
  const { uploadCropImage, fetchCrops, crops } = useCropStore();

  // State to hold form data
  const [farmId, setFarmId] = useState('');
  const [cropId, setCropId] = useState('');
  const [cropImage, setCropImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // Load fields and crops on component mount
    fetchFields();
    fetchCrops();
  }, [fetchFields, fetchCrops]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cropImage) {
      alert("Crop Image should be selected properly");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(cropImage);
    reader.onload = async () => {
      const base64Image = reader.result;
      await uploadCropImage(farmId, cropId, base64Image);

      // Reset form fields
      setFarmId('');
      setCropId('');
      setCropImage(null);
      setPreviewImage(null);
    };
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCropImage(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    } else {
      setCropImage(null);
      setPreviewImage(null);
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
              <div className="h-6 bg-[#2ECC71]"></div>
              <h2 className="text-xl font-semibold text-[#2ECC71]">Upload Crop Image</h2>
            </div>
            <p className="text-gray-500 mt-1 text-sm">Enter your crop details below and upload an image</p>
          </div>

          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Farm ID */}
              <div>
                <label htmlFor="farmId" className="block text-sm font-medium text-gray-700 mb-1">
                  Field
                </label>
                <select
                  id="farmId"
                  name="farmId"
                  value={farmId}
                  onChange={(e) => setFarmId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm bg-white"
                >
                  <option value="">Select field</option>
                  {fields.map((field) => (
                    <option key={field._id} value={field._id}>{field.feildName}</option>
                  ))}
                </select>
              </div>

              {/* Crop ID */}
              <div>
                <label htmlFor="cropId" className="block text-sm font-medium text-gray-700 mb-1">
                  Crop
                </label>
                <select
                  id="cropId"
                  name="cropId"
                  value={cropId}
                  onChange={(e) => setCropId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm bg-white"
                >
                  <option value="">Select crop</option>
                  {crops.map((crop) => (
                    <option key={crop._id} value={crop._id}>{crop.cropName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Crop Image */}
            <div>
              <label htmlFor="cropImage" className="block text-sm font-medium text-gray-700 mb-1">
                Crop Image
              </label>
              <input
                type="file"
                id="cropImage"
                name="cropImage"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm bg-white"
                accept="image/*"
              />
              {previewImage && (
                <div className="mt-4">
                  <img src={previewImage} alt="Crop preview" className="max-h-48 rounded-md border" />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-white py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium h-10"
              >
                Upload Image
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
