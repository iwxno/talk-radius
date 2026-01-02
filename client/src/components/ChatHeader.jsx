import { EllipsisVertical, Users, X } from "lucide-react";
import useMessageStore from "../store/useMessageStore";
import { useState } from "react";
import useRoomStore from "../store/useRoomStore";
function ChatHeader({ setEditPopup }) {
  const { deleteRoom: deleteRoomController } = useRoomStore();
  const { selectRoom, selectedRoom } = useMessageStore();
  const deleteRoom = () => {
    if (!window.confirm("Are you sure you want to delete the room?")) return;
    deleteRoomController(selectedRoom._id, selectRoom);
  };
  return (
    <header className="h-[85px] sm:h-20 border-b border-white/5 flex items-center justify-between px-3 sm:px-8">
      <div
        className="flex items-center sm:gap-4 gap-2 tooltip tooltip-bottom"
        data-tip={selectedRoom.name}
      >
        <div className="size-8 sm:size-10 rounded-lg bg-[#242424]">
          {selectedRoom.roomImg ? (
            <img
              src={selectedRoom.roomImg || "/avator.png"}
              alt={selectRoom.name[0]}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-2xl font-semibold">{selectedRoom.name[0]}</p>
            </div>
          )}
        </div>
        <div className="-space-y-1">
          <h2 className="font-bold text-white text-base sm:text-lg w-[120px] truncate  leading-tight">
            {selectedRoom.name}
          </h2>
          <span className="text-xs text-gray-500">
            By {selectedRoom.createdBy.username}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-0 sm:gap-5 text-gray-400">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-1">
            <EllipsisVertical
              size={20}
              className="hover:text-gray-200 cursor-pointer transition-colors"
            />
          </div>

          <ul
            tabIndex="-1"
            className="dropdown-content menu gap-1 w-32 p-2 bg-[#121212] rounded-lg shadow-lg border border-white z-50"
          >
            <li
              className="text-green-400 w-full h-10 cursor-pointer flex items-center justify-center rounded-md hover:bg-gray-600/20 transition-colors font-semibold tracking-wide"
              onClick={() => setEditPopup(true)}
            >
              Edit Room
            </li>
            <li
              className="text-red-400 w-full h-10 cursor-pointer flex items-center justify-center rounded-md hover:bg-gray-600/20 transition-colors font-semibold tracking-wide"
              onClick={() => deleteRoom()}
            >
              Delete Room
            </li>
          </ul>
        </div>
        <X
          size={20}
          className="hover:text-white cursor-pointer"
          onClick={() => selectRoom(null)}
        />
      </div>
    </header>
  );
}
export default ChatHeader;
