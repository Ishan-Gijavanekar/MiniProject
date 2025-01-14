import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';


const baseUrl = import.meta.env.MODE === 'development'? "http://localhost:5000/api/v1/transport" : "/"

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
      const response = await axios.patch(`${baseUrl}/update-transport/${id}`, updatedData);

      if (response.status !== 200) {
        throw new Error('Failed to update transport');
      }

      set((state) => ({
        transports: state.transports.map((transport) =>
          transport._id === id ? response.data.updatedTransport : transport
        ),
      }));
      toast.success("Transport Updated successfully")
    } catch (error) {
      console.error('Error updating transport:', error);
      toast.error(error.response.data.message)
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

  getTransportById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${baseUrl}/get-transport/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch transport");
      }

      set((state) => ({
        transports: [
          ...state.transports.filter((transport) => transport._id !== id),
          response.data.transport,
        ],
        isLoading: false,
      }));
      set({ isLoading: false });
      
      return response.data.transport;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.log(error);
      toast.error(error.response.data.message)
      return null;
    }
  },


}));
