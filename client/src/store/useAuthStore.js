import { create } from 'zustand';
import api from '../configs/api.js';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const useAuthStore = create((set, get) => ({
    authUser: null,

    isSigningUp: false,
    isLoggingIn: false,
    gettingAuthUser: false,
    socket: null,
    
    signup: async (data) => {
        set({isSigningUp: true})
        try {
            const response = await api.post("/auth/signup", data);
            set({ authUser: response.data })
            toast.success("Account created Successfully!")
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isSigningUp: false})
        }
    },
    login: async (data) => {
        set({isLoggingIn: true})
        try {
            const response = await api.post("/auth/login", data);
            set({ authUser: response.data })
            toast.success("Logged in Successfully!")
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isLoggingIn: false})
        }
    },
    getUser: async (data) => {
        set({gettingAuthUser: true});
        try {
            const response = await api.get("/auth/auth-user");
            set({ authUser: response.data })
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({gettingAuthUser: false})
            return;
        }
    },
    connectSocket: async () => {
        if(!get().authUser || get()?.socket?.connected) return;
        console.log("Connected to socket");
        const socket = io("http://localhost:4000");
        set({socket});
    },
    disconnectSocket: async () => {
        if(get()?.socket?.connected) get()?.socket.disconnect();
    },
    logout: async () => {
        try {
            const response = await api.post('/auth/logout');
            toast.success("Logged out Successfully!");
            set({authUser: null});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}));

export default useAuthStore;