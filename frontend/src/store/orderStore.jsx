import {create} from 'zustand';
import axios from 'axios';


const baseUrl = "http://localhost:5000/api/v1/orders"

const useOrderStore = create((set) => ({
  orders: [],
  distance: null,
  price: null,
  loading: false,
  error: null,
  
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/orders');
      set({ orders: response.data.orders, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  calculateDistance: async (startLoc, endLoc) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${baseUrl}/calculate-distance`, { startLoc, endLoc });
      set({ distance: response.data.distance, loading: false });
      return response.data.distance;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  calculatePrice: async (quantity, crop, distance, vehicle) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${baseUrl}/calculate-price`, { quantity, crop, distance, vehicle });
      set({ price: response.data.price, loading: false });
      return response.data.price;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  placeOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${baseUrl}/place-order`, orderData);
      set((state) => ({ orders: [...state.orders, response.data.order], loading: false }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  clearError: () => {
    set({ error: null });
  }
}));

export default useOrderStore;
