import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.MODE === 'development'? "http://localhost:5000" : "/";

export const useFarmStore = create((set) => ({
  fields: [],
  isLoading: false,
  error: null,

  fetchFields: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${baseUrl}/api/v1/feilds/get-feilds`);  // Updated endpoint
      console.log(response);
      set({ fields: response.data.feildList, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addField: async (field) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${baseUrl}/api/v1/feilds/add-feild`, field);  // Updated endpoint
      set((state) => ({ fields: [...state.fields, response.data.field], isLoading: false }));
      alert("Field Added Successfully");
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.log(error);
      alert("Error");
    }
  },

  updateField: async (id, updatedField) => {
    set({ isLoading: true });
    try {
      const response = await axios.patch(`${baseUrl}/api/v1/feilds/update-feild/${id}`, updatedField);  // Updated endpoint
      set((state) => ({
        fields: state.fields.map((field) => (field._id === id ? response.data.updatedField : field)),
        isLoading: false,
      }));
      alert("Field updated successfully")
    } catch (error) {
      set({ error: error.message, isLoading: false });
      alert("Error")
    }
  },

  deleteField: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(`${baseUrl}/api/v1/feilds/delete-feild/${id}`, {withCredentials: true});  // Updated endpoint
      set((state) => ({ fields: state.fields.filter((field) => field._id !== id), isLoading: false }));
      alert("Deletion successfull")
    } catch (error) {
      set({ error: error.message, isLoading: false });
      alert(error.message)
    }
  },

  getFieldById: async (id) => {
    set({ isLoading: true }); 
    try { const response = await axios.get(`${baseUrl}/api/v1/feilds/get-feild-by-id/${id}`); 
    console.log(response); 
    set((state) => ({ fields: [...state.fields.filter((field) => field._id !== id), response.data.feild], isLoading: false, })); 
    return response.data.feild; // Return the fetched field 
    } catch (error) { 
      set({ error: error.message, isLoading: false }); 
      console.log(error); 
      return null; // Return null if there's an error } 
    }
  },
}));
