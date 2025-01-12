import React, { useEffect, useState } from "react";
import { useSidebar } from "../customhooks/useSidebar";
import { useTransportStore } from "../store/transportStore";
import { useParams } from "react-router-dom";

export default function UpdateTransportForm() {
  const { isOpen: isSidebarOpen } = useSidebar();
  const { id } = useParams();
  const { updateTransport, getTransportById, isLoading, error } = useTransportStore();
  const [transportName, setTransportName] = useState("");
  const [BaseLocation, setBaseLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
    const fetchTransport = async () => {
      const transportData = await getTransportById(id);
      setTransportName(transportData.transportName);
      setBaseLocation(transportData.BaseLocation);
      setContactNumber(transportData.contactNumber);
    };
    fetchTransport();
  }, [id, getTransportById]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transportData = {
      transportName,
      BaseLocation,
      contactNumber,
    };
    console.log(transportData);
    
    await updateTransport(id, transportData);

    // Reset form fields
    setTransportName("");
    setBaseLocation("");
    setContactNumber("");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
              <div className="h-6 bg-[#2ECC71]"></div>
              <h2 className="text-xl font-semibold text-[#2ECC71]">
                Update Transport
              </h2>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Enter your transport details below
            </p>
          </div>

          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Transport Name */}
              <div>
                <label
                  htmlFor="transportName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Transport Name
                </label>
                <input
                  type="text"
                  id="transportName"
                  name="transportName"
                  value={transportName}
                  onChange={(e) => setTransportName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter transport name"
                />
              </div>

              {/* Base Location */}
              <div>
                <label
                  htmlFor="baseLocation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Base Location
                </label>
                <input
                  type="text"
                  id="BaseLocation"
                  name="BaseLocation"
                  value={BaseLocation}
                  onChange={(e) => setBaseLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter base location"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Number */}
              <div>
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] outline-none transition text-sm"
                  placeholder="Enter contact number"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-white py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium h-10"
              >
                Update Transport
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
