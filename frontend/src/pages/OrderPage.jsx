import React, { useEffect, useState } from "react";
import { useVechileStore } from "../store/vechileStore";
import { useNavigate, useParams } from "react-router-dom";
import VehicleCard from "../components/VechileCard";
import CropCard from "../components/CropCard";
import { useCropStore } from "../store/cropStore";
import CropCard2 from "../components/CropCard2";
import useOrderStore from "../store/orderStore";
import VehicleCard2 from "../components/VechileCard2";
import StripePayment from "../components/Payment";
import { PDFDocument, rgb } from 'pdf-lib'
import download from 'downloadjs';

const OrderPage = () => {

  const navigate = useNavigate()

  const { vechiles, getAllVehicles } = useVechileStore();
  const { crops, getAllCrops, isLoading } = useCropStore();
  const { calculateDistance, calculatePrice, placeOrder} = useOrderStore()
  const { id } = useParams();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedcrop, setSelectedcrop] = useState(null);
  const [destination, setDestination] = useState("");
  const [quantity, setQuantity] = useState("");
  const [distance, setDistance] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null)

  useEffect(() => {
    const fetchVehicles = async () => {
        await getAllVehicles(id);
    };

    const getAllCropsData = async () => {
      await getAllCrops();
      setLoading(false);
    };

    fetchVehicles();
    getAllCropsData();
  }, [id, getAllVehicles, getAllCrops]);

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleCropSelected = (crop) => {
    setSelectedcrop(crop)
  }

  const handleGenerateDistance = async () => {
    console.log(selectedcrop)
    const baseLocation = selectedcrop.feildId.location
    const result = await calculateDistance(baseLocation, destination)
    const distanceCalculated = result.split("\\")
    setDistance(distanceCalculated[0]);
  };

  const handleGeneratePrice = async () => {
    const price = await calculatePrice(quantity, selectedcrop._id, distance, selectedVehicle._id)
    setPrice(price);
  };

  const handleSubmit = async(e) => {

    e.preventDefault()

    // alert(
    //   `Vehicle: ${selectedVehicle}\nDestination: ${destination}\nQuantity: ${quantity}\nDistance: ${distance}\nPrice: ${price}`
    // );


    const placeOrderDetails = {
      vechile: selectedVehicle._id,
      transport: selectedVehicle.transporter,
      field: selectedcrop.feildId._id,
      crop: selectedcrop._id,
      quantity: quantity,
      price: price,
      location: destination,
      distance
    }

    await placeOrder(placeOrderDetails)

    navigate(`homepageVendor/printOrder/${response._id}`)

  };

  let avaibleCrops = []
  for (let i=0;i<crops.length;i++) {
    if(crops[i].quantity !== 0) {
      avaibleCrops.push(crops[i])
    }
  }

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Select Vehicle</h2>
        {vechiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vechiles.map((vehicle) => (
              <div key={vehicle._id} onClick={() => handleVehicleSelect(vehicle)} className="cursor-pointer transform transition duration-300 hover:scale-105">
                <VehicleCard2 vehicle={vehicle} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 p-6 text-center bg-gray-100 rounded-lg">
            No vehicles found for this transporter.
          </p>
        )}
      </div>

      {selectedVehicle && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Select Crop</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {avaibleCrops.map((crop) => (  
              <div key={crop._id} onClick={() => handleCropSelected(crop)} className="cursor-pointer transform transition duration-300 hover:scale-105">
                <CropCard2 crop={crop} />
              </div>
            ))}
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Order Details</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination:</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distance:</label>
                <div className="flex">
                  <input
                    type="text"
                    value={distance}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleGenerateDistance}
                    className="px-4 py-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-300"
                  >
                    Generate Distance
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price:</label>
                <div className="flex">
                  <input
                    type="text"
                    value={price}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleGeneratePrice}
                    className="px-4 py-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-300"
                  >
                    Generate Price
                  </button>
                </div>
              </div>
              {price && (<div>
                <StripePayment price = {price}/>
              </div>)}
              
              <button
                onClick={handleSubmit}
                className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 mt-6"
              >
                Submit Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
