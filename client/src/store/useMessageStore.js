import { create } from 'zustand';
import api from '../configs/api';
import { toast } from 'react-toastify'
import useAuthStore from './useAuthStore';
import useRoomStore from './useRoomStore';

const useMessageStore = create((set, get) => ({
    selectedRoom: null,
    gettingMessages: false,
    messages: [],

    selectRoom: (roomId) => {     
        if(get().selectedRoom?._id === roomId?._id) return;
        set({selectedRoom: roomId});
        if(!roomId){
            get().unSubscribeMessages();
            return;
        };
        const socket = useAuthStore.getState().socket;
        if(!socket) return;
        socket.emit("join-room", roomId);
        get().subscribeToMessages();
    },
    getMessages: async () => {
        set({gettingMessages: true});
        try {
            const response = await api.get(`/message/get/${get().selectedRoom._id}`)
            set({messages: response.data});
        } catch (error) {
            toast.error(error.response);
        }
        finally{
            set({gettingMessages: false})
        }
    },
    sendMessage: async (text, image) => {
        try {
            const response = await api.post(`/message/send/${get().selectedRoom._id}`, {
                text,
                image
            });
            set({messages: [...get().messages, response.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    subscribeToMessages: async () => {
        const { selectedRoom } = get();
        if(!selectedRoom) return;

        const socket = useAuthStore.getState().socket;
        if(!socket) return;

        socket.off('message');

        socket.on('message', (message) => {
            if(message.roomId !== selectedRoom?._id){
                return;
            };
            if(message.from._id !== useAuthStore.getState().authUser._id){
                set({messages: [...get().messages, message]});
            }
        })
    },
    unSubscribeMessages: async () => {
        const socket = useAuthStore.getState().socket;
        if(!socket) return;

        socket.off("message");

    }
}));

export default useMessageStore;