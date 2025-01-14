import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';


const baseUrl = import.meta.env.MODE === 'development'? "http://localhost:5000" : "/"

const useOrderStore = create((set) => ({
  orders: [],
  distance: null,
  price: null,
  loading: false,
  error: null,
  
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${baseUrl}/api/v1/orders/get-orders`);
      set({ orders: response.data.allorders, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getOrderById: async(id) => {
    set({ loading:true, error:null })
    try {
      const response = await axios.get(`${baseUrl}/api/v1/orders/getOrderById/${id}`)
      toast.success("Order details fetched successfully")
      set({loading: false})
      return response.data.orderDetails
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.response.data.message)
    }
  },

  calculateDistance: async (startLoc, endLoc) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${baseUrl}/api/v1/orders/calculate-distance`, { startLoc, endLoc });
      set({ distance: response.data.distance, loading: false });
      toast.success("Distance Calculated Successfully")
      return response.data.distance;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.response.data.message)
    }
  },

  calculatePrice: async (quantity, crop, distance, vehicle) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${baseUrl}/api/v1/orders/calculate-price`, { quantity, crop, distance, vehicle });
      set({ price: response.data.price, loading: false });
      toast.success("Price calculated successfully")
      return response.data.price;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.response.data.message)
    }
  },

  placeOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${baseUrl}/api/v1/orders/place-order`, orderData);
      set((state) => ({ orders: [...state.orders, response.data.order], loading: false }));
      toast.success("Order placed successfully")
      return response.data.order
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.response.data.message)
    }
  },

  clearError: () => {
    set({ error: null });
  }
}));

export default useOrderStore;
