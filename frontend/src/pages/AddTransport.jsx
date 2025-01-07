import React, { useState } from 'react';
import { useSidebar } from '../customhooks/useSidebar';
import { useTransportStore } from '../store/transportStore';

export default function AddTransportForm() {
  const { isOpen: isSidebarOpen } = useSidebar();
  const { addTransport } = useTransportStore();

  // State to hold form data
  const [transportName, setTransportName] = useState('');
  const [BaseLocation, setBaseLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const transportData = {
      transportName,
      BaseLocation,
      contactNumber,
    };

    console.log(transportData)

    await addTransport(transportData);

    // Reset form fields
    setTransportName('');
    setBaseLocation('');
    setContactNumber('');
  };

  return (
    <div className={`min-h-screen bg-white transition-all duration-300 ${isSidebarOpen ? 'ml-100' : 'ml-00'}`}>
      {/* Main content */}
      <div className="pt-4 max-w-[2800px] mx-auto">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Form header */}
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <div className="h-6 bg-[#3498db]"></div>
              <h2 className="text-xl font-semibold text-[#3498db]">Add Transport</h2>
            </div>
            <p className="text-gray-500 mt-1 text-sm">Enter your transport details below</p>
          </div>

          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Transport Name */}
              <div>
                <label htmlFor="transportName" className="block text-sm font-medium text-gray-700 mb-1">
                  Transport Name
                </label>
                <input
                  type="text"
                  id="transportName"
                  name='transportName'
                  value={transportName}
                  onChange={(e) => setTransportName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] outline-none transition text-sm"
                  placeholder="Enter transport name"
                />
              </div>

              {/* Base Location */}
              <div>
                <label htmlFor="BaseLocation" className="block text-sm font-medium text-gray-700 mb-1">
                  Base Location
                </label>
                <input
                  type="text"
                  id="BaseLocation"
                  name='BaseLocation'
                  value={BaseLocation}
                  onChange={(e) => setBaseLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] outline-none transition text-sm"
                  placeholder="Enter base location"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Number */}
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name='contactNumber'
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] outline-none transition text-sm"
                  placeholder="Enter contact number"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#3498db] hover:bg-[#2980b9] text-white py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium h-10"
              >
                Add Transport
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
