import { useEffect, useState } from "react";
import { useSidebar } from "../customhooks/useSidebar";
import { useFarmStore } from "../store/farmStore";
import { useCropStore } from "../store/cropStore"; // Adjust import path according to your project structure

export default function AddCropForm() {
  const { isOpen: isSidebarOpen } = useSidebar();
  const { fetchFields, fields, isLoading } = useFarmStore();
  const { addCrop, isLoading: isCropLoading } = useCropStore();
  const [fieldOptions, setFieldOptions] = useState([]);
  const [formData, setFormData] = useState({
    cropName: "",
    variety: "",
    quantity: "",
    fieldId: "",
    growthStage: "",
    price: "",
    plantDate: "",
    harvestDate: ""
  });

  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

  useEffect(() => {
    if (fields.length > 0) {
      setFieldOptions(fields);
    }
  }, [fields]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCrop = {
      cropName: formData.cropName,
      variety: formData.variety,
      quantity: formData.quantity,
      feildId: formData.fieldId,
      growthStage: formData.growthStage,
      price: formData.price,
      plantingDate: formData.plantDate,
      harvestDate: formData.harvestDate
    };
    await addCrop(newCrop);
  };

  return (
    <div
      className={`min-h-screen bg-white transition-all duration-300 ${
        isSidebarOpen ? "ml-100" : "ml-00"
      }`}
    >
      {/* Main content */}
      <div className="pt-4 max-w-[2800px] mx-auto">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Form header */}
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <div className=" h-6 bg-[#2ECC71]"></div>
              <h2 className="text-xl font-semibold text-[#2ECC71]">Add Crop</h2>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Enter your Crop details below
            </p>
          </div>

          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Crop Name */}
              <div>
                <label
                  htmlFor="cropName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Crop Name
                </label>
                <input
                  type="text"
                  id="cropName"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter Crop name"
                  value={formData.cropName}
                  onChange={handleChange}
                />
              </div>

              {/* Variety */}
              <div>
                <label
                  htmlFor="variety"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Variety
                </label>
                <input
                  type="text"
                  id="variety"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter Crop Variety"
                  value={formData.variety}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Quantity */}
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter Quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>

              {/* Field Id */}
              <div>
                <label
                  htmlFor="fieldId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Field Id
                </label>
                <select
                  id="fieldId"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm bg-white"
                  value={formData.fieldId}
                  onChange={handleChange}
                >
                  <option value="">Select Field Id</option>
                  {isLoading ? (
                    <option>Loading...</option>
                  ) : (
                    fieldOptions.map((field) => (
                      <option key={field._id} value={field._id}>
                        {field.feildName}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Growth Stage */}
              <div>
                <label
                  htmlFor="growthStage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Growth stage
                </label>
                <select
                  id="growthStage"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm bg-white"
                  value={formData.growthStage}
                  onChange={handleChange}
                >
                  <option value="">Select Growth Stage</option>
                  <option value="Seeding">Seeding</option>
                  <option value="Vegatative">Vegatative</option>
                  <option value="Flowering">Flowering</option>
                  <option value="Harvesting">Harvesting</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter Price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Plant Date */}
              <div>
                <label
                  htmlFor="plantDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Plant Date
                </label>
                <input
                  type="date"
                  id="plantDate"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter Plant Date"
                  value={formData.plantDate}
                  onChange={handleChange}
                />
              </div>

              {/* Harvest Date*/}
              <div>
                <label
                  htmlFor="harvestDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Harvest Date
                </label>
                <input
                 type="date"
                  id="harvestDate"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm bg-white"
                  value={formData.harvestDate}
                  onChange={handleChange}
                />
              </div>
            </div>
           
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-white py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium h-10"
                disabled={isCropLoading}
              >
                {isCropLoading ? 'Adding...' : 'Add Crop'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
