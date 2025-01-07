import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useVechileStore } from '../store/vechileStore';
import { useParams } from 'react-router-dom';
import VehicleCard from './VechileCard';

const VehiclesList = () => {
  //const [vehicles, setVehicles] = useState([]);
  const {vechiles,getVechiles} = useVechileStore()
  const {id} = useParams()

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await getVechiles(id)
        //setVehicles(response.data.vehicles.vechiles);
      } catch (error) {
        console.log("Error in getting vehicles ", error.message);
      }
    };

    fetchVehicles();
  }, [id]);

  return (
    <div className='flex flex-wrap justify-center'>
      {vechiles.length > 0 ? (
        vechiles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))
      ) : (
        <p className="text-gray-600 p-6">No vehicles found for this transporter.</p>
      )}
    </div>
  );
};

export default VehiclesList;
