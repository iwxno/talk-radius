import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatArea from "../components/ChatArea";
import InputArea from "../components/InputArea";
import AddPopup from "../components/AddPopup";
import useMessageStore from "../store/useMessageStore";
import { MessageSquareDashed } from "lucide-react";
import useRoomStore from "../store/useRoomStore";
import Editpopup from "../components/EditPopup";

const Home = () => {
  const [addPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);

  const { selectedRoom } = useMessageStore();
  const { gettingRooms } = useRoomStore();

  return (
    // Main background: specific dark charcoal from screenshot
    <div className="flex h-screen bg-[#121212] text-gray-300 font-sans overflow-hidden">
      {addPopup && <AddPopup setAddPopup={setAddPopup} />}
      {editPopup && <Editpopup setEditPopup={setEditPopup} />}
      {/* --- SIDEBAR --- */}
      <Sidebar setAddPopup={setAddPopup} />
      {/* --- CHAT AREA --- */}
      <div className="flex-1 flex flex-col bg-[#121212]">
        {/* Header */}
        {!gettingRooms && selectedRoom ? (
          <>
            <ChatHeader setEditPopup={setEditPopup} /> <ChatArea />{" "}
            <InputArea />
          </>
        ) : !gettingRooms ? (
          <div className="flex flex-col items-center justify-center h-full w-full p-6 text-center animate-fade-in">
            {/* Animated Icon Container */}
            <div className="relative mb-6">
              {/* Soft Glow Background */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>

              {/* Floating Icon */}
              <div className="relative bg-base-300 p-6 rounded-3xl border border-white/5 shadow-2xl animate-bounce-slow">
                <MessageSquareDashed
                  size={48}
                  className="text-primary opacity-80"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="max-w-xs space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Your Conversations
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Select a room from the sidebar to start messaging your team.
              </p>
            </div>

            {/* Mini DaisyUI Status Badge */}
            <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] rounded-full border border-white/5 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Network Ready
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen w-full">
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
      </div>
    </div>
  );
};

export default Home;
