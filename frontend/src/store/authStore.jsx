import {create} from 'zustand'
import { axiosInstance } from '../utils/axios'
import {toast} from 'react-hot-toast'

const baseUrl = "http://localhost:5000/api/v1/users"

export const useAuthStore = create((set, get) => ({
    userAuth: null,
    isLoading: false,


    checkAuth: async() => {
      set({isLoading: true})
      try {
        const res = await axiosInstance.get(`${baseUrl}/get-user`)
        set({userAuth: res.data})
      } catch (error) {
        console.log("Error in checkAuth: ", error)
        set({userAuth: null})
      } finally {
        set({isLoading: false})
      }
    },

    signup: async(data) => {
      set({isLoading: true})
      try {
        const res = await axiosInstance.post(`${baseUrl}/register`, data)
        set({userAuth: res.data})
        toast.success("User Registered Successfully")
      } catch (error) {
        console.log("Error in signup: ", error)
        toast.error(error.response.data.message)
      } finally {
        set({isLoading: false})
      }
    }, 

    login: async(data) => {
      set({isLoading: true})
      try {
        const res = await axiosInstance.post(`${baseUrl}/login`, data)
        set({userAuth: res.data})
        toast.success("Login Successfully")
      } catch (error) {
        console.log("Error in login: ", error)
        toast.error(error.response.data.message)
      } finally {
        set({isLoading: false})
      }
    },

    logout: async() => {
      try {
        const res = await axiosInstance.post(`${baseUrl}/logout`)
        set({userAuth: null})
        toast.success("Logout Successfully")
      } catch (error) {
        console.log("Error in login: ", error)
        toast.error(error.response.data.message)
      }
    }

}))