import React, { useEffect } from 'react';
import IndustrialOrderCard from './OrderCard';
import useOrderStore from '../store/orderStore';

const OrderListPage = () => {
  const { orders, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <IndustrialOrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderListPage;
