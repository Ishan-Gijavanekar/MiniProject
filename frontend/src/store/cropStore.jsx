import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;
const baseUrl = "http://localhost:5000/api/v1/crops";

export const useCropStore = create((set) => ({
  crops: [],
  isLoading: false,
  error: null,

  fetchCrops: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${baseUrl}/get-crops`);
      set({ crops: response.data.crops, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addCrop: async (crop) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${baseUrl}/add-crop`, crop);
      set((state) => ({ crops: [...state.crops, response.data.newCrop], isLoading: false }));
      alert("Crop Added Successfully");
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.log(error);
      alert("Error");
    }
  },

  updateCrop: async (id, updatedCrop) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(`${baseUrl}/update-crop/${id}`, updatedCrop);
      set((state) => ({
        crops: state.crops.map((crop) => (crop._id === id ? response.data.updateDetails : crop)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteCrop: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(`${baseUrl}/delete-crop/${id}`);
      set((state) => ({ crops: state.crops.filter((crop) => crop._id !== id), isLoading: false }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  getCropById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${baseUrl}/get-crop-by-id/${id}`);
      set((state) => ({
        crops: [...state.crops.filter((crop) => crop._id !== id), response.data.crop],
        isLoading: false,
      }));
      return response.data.crop;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.log(error);
      return null;
    }
  },

  getCropByIdFromBody: async (id) => {
    set({ isLoading: true });
    try {
      console.log(id)
      const response = await axios.post(`${baseUrl}/get-crop`,id);
      set((state) => ({
        crops: [...state.crops.filter((crop) => crop._id !== id), response.data.crop],
        isLoading: false,
      }));
      console.log(response)
      set({ isLoading: false });
      return response.data.crop;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.log(error);
      return null;
    }
  },

  uploadCropImage: async (id, cropImage) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${baseUrl}/upload-crop-image/${id}`, { cropImage });
      set((state) => ({
        crops: state.crops.map((crop) => (crop._id === id ? response.data.uploadImage : crop)),
        isLoading: false,
      }));
      alert("Image Uploaded Successfully");
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.log(error);
      alert("Error");
    }
  },

  getAvailableStock: async (cropName, feildId) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${baseUrl}/get-available-stock`, { cropName, feildId });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.log(error);
      return null;
    }
  },
}));
