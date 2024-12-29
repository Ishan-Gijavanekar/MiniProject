import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name) => {
    // Your signup logic here
  },
  login: async (email, password) => {
    // Your login logic here
  },
  logout: async () => {
    // Your logout logic here
  },
  verifyEmail: async (code) => {
    // Your verifyEmail logic here
  },
  checkAuth: async () => {
    // Your checkAuth logic here
  },
  forgotPassword: async (email) => {
    // Your forgotPassword logic here
  },
  resetPassword: async (token, password) => {
    // Your resetPassword logic here
  }
}));
