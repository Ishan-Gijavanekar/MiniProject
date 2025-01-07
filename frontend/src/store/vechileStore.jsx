import {create} from 'zustand';
import axios from 'axios';

export const useVechileStore = create((set) => ({
  vechiles: [],
  isLoading: false,
  addVechile: async (vechileData) => {
    set({ isLoading: true });
    try {
      const response = await axios.post('/api/vechiles', vechileData);

      if (response.status !== 200) {
        throw new Error('Failed to add vechile');
      }

      set((state) => ({
        vechiles: [...state.vechiles, response.data.newVechile],
      }));
    } catch (error) {
      console.error('Error adding vechile:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  getVechiles: async (transporterId) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`/api/vechiles/${transporterId}`);

      if (response.status !== 200) {
        throw new Error('Failed to fetch vechiles');
      }

      set({ vechiles: response.data.vechiles });
    } catch (error) {
      console.error('Error fetching vechiles:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  updateVechile: async (id, updatedData) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(`/api/vechiles/${id}`, updatedData);

      if (response.status !== 200) {
        throw new Error('Failed to update vechile');
      }

      set((state) => ({
        vechiles: state.vechiles.map((vechile) =>
          vechile._id === id ? response.data.updateVechile : vechile
        ),
      }));
    } catch (error) {
      console.error('Error updating vechile:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  deleteVechile: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axios.delete(`/api/vechiles/${id}`);

      if (response.status !== 200) {
        throw new Error('Failed to delete vechile');
      }

      set((state) => ({
        vechiles: state.vechiles.filter((vechile) => vechile._id !== id),
      }));
    } catch (error) {
      console.error('Error deleting vechile:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  bookVechile: async (id, bookingData) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`/api/vechiles/book/${id}`, bookingData);

      if (response.status !== 200) {
        throw new Error('Failed to book vechile');
      }

      set((state) => ({
        vechiles: state.vechiles.map((vechile) =>
          vechile._id === id ? response.data.booking : vechile
        ),
      }));
    } catch (error) {
      console.error('Error booking vechile:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
