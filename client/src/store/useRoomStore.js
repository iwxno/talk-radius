import { create } from "zustand";
import api from '../configs/api.js';
import { toast } from 'react-toastify';
import useMessageStore from "./useMessageStore.js";

const useRoomStore = create((set, get) => ({
    rooms: [],
    gettingRooms: false,
    isCreatingRoom: false,
    isEditingRoom : false,

    getRooms: () => {
        set({ gettingRooms: true });
        set({rooms: []})
        console.log("getting rooms");
        navigator.geolocation.getCurrentPosition(
        async (pos) => {
            try {
                const { longitude, latitude } = pos.coords;

                const response = await api.post("/room", {
                    coordinates: [longitude, latitude],
                });

                set({ rooms: response.data });
            } catch (error) {
                toast.error(error?.response?.data?.message || "Something went wrong");
            } finally {
                set({ gettingRooms: false });
            }
        },
        (error) => {
            toast.error("Location access denied");
            set({ gettingRooms: false });
        }
    );
    },
    createRoom: (name, roomImg) => {
        set({isCreatingRoom: true});
        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {

                const { longitude, latitude } = pos.coords;
                const response = await api.post('/room/create', {
                    name,
                    roomImg,
                    coordinates: [longitude, latitude]
                });
                set({rooms : [...get().rooms, response.data]})

            } catch (error) {
                toast.error(error.response.data.message);
            }
            finally{
                set({isCreatingRoom: false});
            }
        }, (err) => {
            set({isCreatingRoom: false});
            toast.error("Location access deniend");
        })
    },
    refreshCoords: () => {
        console.log("refreshing coords")
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
            const {longitude, latitude} = pos.coords;
            const response = await api.put('/room/update-coords', {
            coordinates: [longitude, latitude]
            });
            get().getRooms();
        } catch (error) {
            toast.error(error.response.data.message);
        }
      }, err => toast.error("Access Denined!"))  
    },
    deleteRoom: async (roomId, selectRoom) => {
        try {
            const selectedRoom = useMessageStore.getState().selectedRoom;
            if(!selectedRoom) return toast.error("No room found!");

            const response = await api.delete(`/room/${roomId}`);
            set({rooms : get().rooms.filter(room => room._id !== roomId)});
            selectRoom(null);
            toast.success("Room deleted Successfully!")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    updateProfile: async (name, roomImg, roomId) => {
        set({isEditingRoom: true});
        try {
            const response = await api.post(`/room/update-profile/${roomId}`, {
                name,
                roomImg
            });
            set({rooms: get().rooms.map(room => {
                if(room._id === roomId){
                    room.name = response.data.name;
                    room.roomImg = response.data.roomImg;
                };
                return room;
            })})
            toast.success("Room updated Successfully!");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isEditingRoom: false})
        }
    }
}));

export default useRoomStore;