import { create } from "zustand";
import axios from "axios";
import { axiosInstance } from '../utils/axios'

axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.MODE === 'development'? "http://localhost:5000" : "/";

export const useCropStore = create((set) => ({
  crops: [],
  isLoading: false,
  error: null,
  stocks: [],

  fetchCrops: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/api/v1/crops/get-crops`);
      set({ crops: response.data.crops, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addCrop: async (crop) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(`/api/v1/crops/add-crop`, crop);
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
      const response = await axiosInstance.patch(`/api/v1/crops/update-crop/${id}`, updatedCrop);
      set((state) => ({
        crops: state.crops.map((crop) => (crop._id === id ? response.data.updateDetails : crop)),
        isLoading: false,
      }));
      alert("Updated successfully")
    } catch (error) {
      set({ error: error.message, isLoading: false });
      alert(error.message)
    }
  },

  deleteCrop: async (id) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/api/v1/crops/delete-crop/${id}`);
      set((state) => ({ crops: state.crops.filter((crop) => crop._id !== id), isLoading: false }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  getAllCrops : async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/api/v1/crops/getAllCrops`);
      set((state) => ({
        crops: response.data.crops,
        isLoading: false,
      }));
      return response.data.crop;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.log(error);
      return null;
    }
  },

  getCropById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/api/v1/crops/get-crop/${id}`);
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
      const response = await axiosInstance.post(`/api/v1/crops/get-crop`,id);
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

  uploadCropImage: async (farmId, cropId, cropImage) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.patch(`/api/v1/crops/upload-crop-image`, {
        farmId,
        cropId,
        cropImage
      });
  
      set((state) => ({
        crops: state.crops.map((crop) => (crop._id === cropId ? response.data.uploadImage : crop)),
        isLoading: false,
      }));
  
      alert("Image Uploaded Successfully");
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.log(error);
      alert("Error");
    }
  },
  

  getAvailableStock: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/api/v1/crops/get-stock`);
      set({stocks: response.data.stocks , isLoading: false });
      return response.data.stocks;
      alert("Stock Retrived successfully")
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.log(error);
      return null;
    }
  },
}));
