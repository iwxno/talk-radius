import { Search, Plus, RotateCcw } from "lucide-react";
import useRoomStore from "../store/useRoomStore";
import RoomSide from "./RoomSide";
import { useEffect, useState } from "react";
function Sidebar({ setAddPopup }) {
  const { getRooms, rooms, gettingRooms } = useRoomStore();
  const [searchFiletered, setSearchFiletered] = useState("");
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  useEffect(() => {
    setFilteredRooms((r) =>
      rooms.filter((room) => {
        return room.name.toLowerCase().includes(searchFiletered.toLowerCase());
      })
    );
  }, [searchFiletered, rooms]);

  return (
    <div className="w-fit md:w-80 bg-[#1a1a1a] flex flex-col border-r border-white/5 resize-x resize">
      <div className="w-20 sm:w-full p-4 flex sm:justify-between justify-center items-center flex-col gap-2 sm:flex-row">
        <h1 className="text-base md:text-xl font-bold text-white ">Rooms</h1>
        <div className="flex items-center justify-center gap-2">
          <RotateCcw
            size={20}
            onClick={() => getRooms()}
            className={`cursor-pointer hover:text-white transition-colors ${
              gettingRooms && "animate-pulse"
            }`}
          />
          <Plus
            size={20}
            onClick={() => setAddPopup(true)}
            className="cursor-pointer hover:text-white transition-colors"
          />
        </div>
      </div>

      <div className="px-4 mb-6 md:block hidden w-12 md:w-full">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
            size={16}
          />
          <input
            type="text"
            onChange={(e) => setSearchFiletered(e.target.value)}
            placeholder="Search rooms..."
            className="w-full bg-[#242424] border-none py-2.5 pl-10 pr-4 rounded-lg focus:outline-none text-sm placeholder:text-gray-600"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {gettingRooms && (
          <div className="flex items-center justify-center h-full w-full">
            <div className="flex items-center justify-center space-x-2">
              {/* Dot 1 */}
              <div className="w-2 h-2 rounded-full bg-primary animate-[bounce_1s_infinite_0ms]"></div>

              {/* Dot 2 */}
              <div className="w-2 h-2 rounded-full bg-primary animate-[bounce_1s_infinite_200ms]"></div>

              {/* Dot 3 */}
              <div className="w-2 h-2 rounded-full bg-primary animate-[bounce_1s_infinite_400ms]"></div>

              {/* Optional: Screen reader text for accessibility */}
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {!gettingRooms &&
          filteredRooms.map((room) => <RoomSide key={room._id} room={room} />)}
        <div
          className={`items-center md:flex hidden gap-3 px-4 py-2 cursor-pointer justify-center transition-all mt-2`}
        >
          {!gettingRooms && rooms.length === 0 && (
            <div className="flex-1">
              <button
                className="btn btn-primary w-full rounded-full h-12 bg-black/20 border border-white shadow-white"
                onClick={() => setAddPopup(true)}
              >
                Create Room <Plus size={18} />
              </button>
            </div>
          )}
        </div>
        <div className="flex-1 md:block hidden px-4">
          <button
            className="btn btn-primary w-full rounded-full h-12 bg-black/20 border border-white shadow-white"
            onClick={() => getRooms()}
          >
            Refresh <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
