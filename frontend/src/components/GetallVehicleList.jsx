import React, { useEffect } from 'react';
import { useVechileStore } from '../store/vechileStore';
import VehicleCard from './VechileCard';

const VechileList = () => {
  const { vechiles, getAllVehicles, isLoading } = useVechileStore();

  useEffect(() => {
    getAllVehicles();
  }, [getAllVehicles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {vechiles.map((vehicle) => (
        <VehicleCard key={vehicle._id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VechileList;