import { Users, X } from "lucide-react";
import useMessageStore from "../store/useMessageStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
function RoomSide({ room }) {
  const { selectedRoom, selectRoom } = useMessageStore();
  const [time, setTime] = useState("");
  const [smallTime, setSmallTime] = useState("");
  useEffect(() => {
    const timeout = setInterval(() => {
      const ms = new Date(room.expiresAt).getTime() - Date.now();

      const hours = Math.floor(ms / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((ms % (1000 * 60)) / 1000);

      setTime(`${hours}h ${minutes}m ${seconds}s`);
      setSmallTime(`${hours}:${minutes}`);
    }, 1000);
    return () => {
      clearInterval(timeout);
    };
  }, []);

  if (new Date(selectedRoom?.expiresAt).getTime() < Date.now()) {
    selectRoom(null);
  }
  if (new Date(room?.expiresAt).getTime() == Date.now()) {
    toast.success("Room expired!", {
      position: "top-right",
      autoClose: 3000, // milliseconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <div
      key={room?._id}
      className={`flex items-center gap-3 p-4 w-full h-20 sm:h-fit relative cursor-pointer border-l-4 transition-all hover:bg-[#242424]/60 ${
        selectedRoom?._id === room._id
          ? "bg-[#242424] border-primary text-white"
          : "bg-[#1a1a1a] border-transparent text-white"
      } ${new Date(room.expiresAt).getTime() < Date.now() && "hidden"} `}
      onClick={() => selectRoom(room)}
    >
      <div className="size-10 md:size-12 rounded-lg bg-[#333] shrink-0">
        {room.roomImg ? (
          <img
            src={room.roomImg}
            alt={room.name.substring(0, 2)}
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-2xl font-semibold">{room.name[0]}</p>
          </div>
        )}
        <time className="flex md:hidden items-center absolute bottom-0 sm:bottom-1/2 sm:translate-y-1/2 text-white/40 font-extralight right-[50%] sm:right-3 translate-x-1/2 sm:translate-x-0 justify-center text-xs">
          {smallTime}
        </time>
      </div>
      <div className="min-w-0 hidden flex-1 md:block">
        <div className="flex justify-between items-center mb-0.5">
          <h3 className="font-semibold text-[14px] truncate">{room.name}</h3>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-1">
          Expire in : <time>{time}</time>
        </div>
      </div>
    </div>
  );
}
export default RoomSide;
