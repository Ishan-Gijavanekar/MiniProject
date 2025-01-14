import {create} from 'zustand'
import { axiosInstance } from '../utils/axios'
import {toast} from 'react-hot-toast'
import {io} from 'socket.io-client'
import axios from 'axios'

const baseUrl = import.meta.env.MODE === 'development'?  "http://localhost:5000" : "/"
const baseUrl1 = import.meta.env.MODE === 'development'? "http://localhost:5000" : "/"

export const useAuthStore = create((set, get) => ({
    userAuth: null,
    isLoading: false,
    socket:null,
    onlineUsers: [],


    checkAuth: async() => {
      set({isLoading: true})
      try {
        const res = await axios.get(`${baseUrl}/api/v1/users/get-user`)
        set({userAuth: res.data.user})
        get().connectSocket()
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
        const res = await axios.post(`${baseUrl}/api/v1/users/register`, data)
        set({userAuth: res.data})
        get().connectSocket()
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
        const res = await axios.post(`${baseUrl}/api/v1/users/login`, data)
        set({userAuth: res.data})
        //console.log(userAuth)
        get().connectSocket()
        toast.success("Login Successfully")
        return res.data
        
        
      } catch (error) {
        console.log("Error in login: ", error)
        toast.error(error.response.data.message)
      } finally {
        set({isLoading: false})
      }
    },

    logout: async() => {
      try {
        const res = await axios.post(`${baseUrl}/api/v1/users/logout`)
        set({userAuth: null})
        get().disconnectSocket()
        toast.success("Logout Successfully")
      } catch (error) {
        console.log("Error in login: ", error)
        toast.error(error.response.data.message)
      }
    },

    forgetPassword: async(data) => {
      set({isLoading: true})
      try {
        const res = await axios.post(`${baseUrl}/api/v1/users/forget-password`, data)
        set({userAuth: res.data.updatedUser})
        toast.success(res.data.message)
      } catch (error) {
        console.log("Error in forgetPassword: ", error)
        toast.error(error.response.data.message)
      } finally {
        set({isLoading: false})
      }
    },

    updateProfilePic: async(data) => {
      set({isLoading: true})
      try {
        const res = await axios.post(`${baseUrl}/api/v1/users/update-profilePic`, data)
        set({userAuth: res.data.updatedUser})
        alert("Profile picture uploaded successfully")
        toast.success(res.data.message)
      } catch (error) {
        console.log("Error in updateProfilePic: ", error)
        alert(error.message)
        toast.error(error.response.data.message)
      } finally {
        set({isLoading: false})
      }
    },

    updateBackgroundPic: async(data) => {
      set({isLoading: true})
      try {
        const res = await axios.post(`${baseUrl}/api/v1/users/update-backgroundPic`, data)
        set({userAuth: res.data.updatedUser})
        alert("Image upload successfull")
        toast.success(res.data.message)
      } catch (error) {
        console.log("Error in updateBackgroundPic: ", error)
        alert(error.message)
        toast.error(error.response.data.message)
      } finally {
        set({isLoading: false})
      }
    },

    connectSocket: () => {
      const {userAuth} = get()
      if(!userAuth || get().socket?.connected) {
          return
      }
      const socket = io(baseUrl1, {
          query: {
              userId: userAuth._id,
          }
      })
      socket.connect()
      set({socket:socket})
      console.log(socket)
      socket.on("getOnlineUsers", (userId) => {
          set({onlineUsers:userId})
      })
  },

  disconnectSocket: () => {
      if(get().socket?.connected) {
          get().socket.disconnect()
      }
  }


}))