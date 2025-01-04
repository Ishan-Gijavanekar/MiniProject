import { useSidebar } from "../customhooks/useSidebar";

export default function AddCropForm() {
  let array = [1, 2, 3, 4, 5];
  const { isOpen: isSidebarOpen } = useSidebar();

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
          <form className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Crop Name */}
              <div>
                <label
                  htmlFor="CropName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Crop Name
                </label>
                <input
                  type="text"
                  id="CropName"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter Crop name"
                />
              </div>

              {/* Variety */}
              <div>
                <label
                  htmlFor="Variety"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Variety
                </label>
                <input
                  type="text"
                  id="Variety"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter Crop Variety"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Quantity */}
              <div>
                <label
                  htmlFor="Quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="Quantity"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter Quantity"
                />
              </div>

              {/* Feild Id */}
              <div>
                <label
                  htmlFor="soilType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Field Id Type
                </label>
                <select
                  id="soilType"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm bg-white"
                >
                    <option value="">Select Field Id</option>

                  {array.map((value, index) => (
                    <option key={index} value={index}>
                      {value}
                    </option>
                  ))}

                </select>
                
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Crop Name */}
              <div>
              <label
                htmlFor="irrigation"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
              Growth stage
              </label>
              <select
                id="irrigation"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm bg-white"
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
                  htmlFor="Price "
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price
                </label>
                <input
                  type="Number"
                  id="Price"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* PlantDate */}
              <div>
                <label
                  htmlFor="Plant Date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Plant Date
                </label>
                <input
                  type="Date"
                  id="Plantdate"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter Quantity"
                />
              </div>

              {/* Harvest Date*/}
              <div>
                <label
                  htmlFor="Harvest Date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Harvest Date
                </label>
                <input
                 type="Date"
                  id="Harvestdate"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm bg-white"
                />
                    
                
              </div>
            </div>
          

           
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-white py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium h-10"
              >
                Add Crop
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}