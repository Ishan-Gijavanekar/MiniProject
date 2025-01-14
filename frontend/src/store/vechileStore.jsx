import { create } from 'zustand';
import axios from 'axios';

const baseUrl = import.meta.env.MODE === 'development'? "http://localhost:5000/api/v1/vechiles" : "/";

export const useVechileStore = create((set) => ({
  vechiles: [],
  isLoading: false,

  addVechile: async (id, vechileData) => {
    console.log(vechileData)
    set({ isLoading: true });
    try {
      const response = await axios.post(`${baseUrl}/add-vechile/${id}`, vechileData);

      if (response.status !== 200) {
        throw new Error('Failed to add vechile');
      }

      set((state) => ({
        vechiles: [...state.vechiles, response.data.newVechile],
      }));
      alert("Vechile Added successfully")
    } catch (error) {
      console.error('Error adding vechile:', error);
      alert("Error", error.message)
    } finally {
      set({ isLoading: false });
    }
  },
  getVechiles: async (transporterId) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${baseUrl}/get-vechiles/${transporterId}`);

      if (response.status !== 200) {
        throw new Error('Failed to fetch vechiles');
      }

      set({ vechiles: response.data.vechiles });
      console.log(response.data.vechiles);
      return response;

    } catch (error) {
      console.error('Error fetching vechiles:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  getVechilesById: async (vechileId) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${baseUrl}/getVechileById/${vechileId}`);

      if (response.status !== 200) {
        throw new Error('Failed to fetch vechiles');
      }

      set((state) => ({
        vechiles: [
          ...state.vechiles.filter((vechile) => vechile._id !== vechileId),
          response.data.vechiles,
        ],
        isLoading: false,
      }));

      return response.data.vechiles

    } catch (error) {
      console.error('Error fetching vechiles:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateVechile: async (id, updatedData) => {
    set({ isLoading: true });
    try {
      const response = await axios.patch(`${baseUrl}/update-details/${id}`, updatedData);

      if (response.status !== 200) {
        throw new Error('Failed to update vechile');
      }

      set((state) => ({
        vechiles: state.vechiles.map((vechile) =>
          vechile._id === id ? response.data.updateVechile : vechile
        ), isLoading: false
      }));
      alert("Vehicle Updated Successfully")
    } catch (error) {
      console.error('Error updating vechile:', error);
      alert(error.message)
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

  uploadImage: async (vechileData) => {
    set({ isLoading: true });
    try {
      const response = await axios.patch(`${baseUrl}/upload-image`, vechileData);

      if (response.status !== 200) {
        throw new Error('Failed to upload image');
      }

      set((state) => ({
        vechiles: state.vechiles.map((vechile) =>
          vechile._id === response.data.updateImage._id ? response.data.updateImage : vechile
        ),
      }));
      set({isLoading: false})
      alert("Image uploaded successfully")
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(error.message)
    } finally {
      set({ isLoading: false });
    }
  },

  getAllVehicles: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${baseUrl}/get-vechiles`);

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

}));
