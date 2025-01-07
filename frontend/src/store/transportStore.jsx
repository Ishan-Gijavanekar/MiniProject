import {create} from 'zustand';
import axios from 'axios';


const baseUrl = "http://localhost:5000/api/v1/transport"

export const useTransportStore = create((set) => ({
  transports: [],
  isLoading: false,
  addTransport: async (transportData) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${baseUrl}/add-transport`, transportData);

      if (response.status !== 200) {
        throw new Error('Failed to add transport');
      }

      set((state) => ({
        transports: [...state.transports, response.data.transport],
      }));
    } catch (error) {
      console.error('Error adding transport:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  getTransports: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${baseUrl}/get-transport`);

      if (response.status !== 200) {
        throw new Error('Failed to fetch transports');
      }

      set({ transports: response.data.transports });
    } catch (error) {
      console.error('Error fetching transports:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  updateTransport: async (id, updatedData) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(`/api/transports/${id}`, updatedData);

      if (response.status !== 200) {
        throw new Error('Failed to update transport');
      }

      set((state) => ({
        transports: state.transports.map((transport) =>
          transport._id === id ? response.data.updatedTransport : transport
        ),
      }));
    } catch (error) {
      console.error('Error updating transport:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  deleteTransport: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axios.delete(`/api/transports/${id}`);

      if (response.status !== 200) {
        throw new Error('Failed to delete transport');
      }

      set((state) => ({
        transports: state.transports.filter((transport) => transport._id !== id),
      }));
    } catch (error) {
      console.error('Error deleting transport:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
