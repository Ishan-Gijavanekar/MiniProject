import React, { useState } from 'react';
import { useSidebar } from '../customhooks/useSidebar';
import { useVechileStore } from '../store/vechileStore';
import { useParams } from 'react-router-dom';

export default function AddVehicleForm() {
 
    const {id} = useParams()

  const { isOpen: isSidebarOpen } = useSidebar();
  const { addVechile } = useVechileStore();

  // State to hold form data
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [cost, setCost] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vehicleData = {
      vehicleName,
      vehicleNumber,
      capacity: parseInt(capacity),
      cost: parseFloat(cost)
    };

    console.log(vehicleData)

    await addVechile(id, vehicleData);

    // Reset form fields
    setVehicleName('');
    setVehicleNumber('');
    setCapacity('');
    setCost('');
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
              <h2 className="text-xl font-semibold text-[#3498DB]">Add Vehicle</h2>
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
                  name='vehicleName'
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
                  name='vehicleNumber'
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#3498DB] focus:border-[#3498DB] outline-none transition text-sm"
                  placeholder="Enter vehicle number"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Capacity */}
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity (in kg)
                </label>
                <input
                  type="number"
                  id="capacity"
                  name='capacity'
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#3498DB] focus:border-[#3498DB] outline-none transition text-sm"
                  placeholder="Enter vehicle capacity"
                />
              </div>

              {/* Cost */}
              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
                  Cost (in currency)
                </label>
                <input
                  type="number"
                  id="cost"
                  name='cost'
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#3498DB] focus:border-[#3498DB] outline-none transition text-sm"
                  placeholder="Enter cost"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#3498DB] hover:bg-[#2980B9] text-white py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium h-10"
              >
                Add Vehicle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
