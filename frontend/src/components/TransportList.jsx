import React, { useEffect } from 'react';
import { useTransportStore } from '../store/transportStore';
import CompanyDetailsCard from './TransportCard';

const TransportList = () => {
  const { transports, getTransports, isLoading } = useTransportStore();

  useEffect(() => {
    getTransports();
  }, [getTransports]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {transports.map((transport) => (
        <CompanyDetailsCard key={transport._id} transport={transport} />
      ))}
    </div>
  );
};

export default TransportList;
