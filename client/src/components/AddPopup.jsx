import React, { useRef, useState } from "react";
import { Camera, Loader, X } from "lucide-react";
import useRoomStore from "../store/useRoomStore";

const AddPopup = ({ setAddPopup }) => {
  const fileInputRef = useRef(null);
  const { createRoom, isCreatingRoom } = useRoomStore();

  const [username, setUsername] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState("");

  const handleCameraClick = async () => {
    await createRoom(username, imageBase64);
    setAddPopup(false);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[e.target.files.length - 1];
    if (!file) return;

    // Preview (fast, no memory heavy base64)
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    // Base64 for upload
    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Main Glassmorphism Card */}
      <div className="relative w-full max-w-sm bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
        {/* Glow Effects in background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/20 blur-[80px] rounded-full"></div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Header Title */}
          <div className="flex items-center justify-between gap-2 w-full mb-8">
            <h2 className="text-sm font-black text-primary tracking-[0.3em] uppercase">
              Create Room
            </h2>
            <X onClick={() => setAddPopup(false)} className="cursor-pointer" />
          </div>

          {/* Profile Picture Section */}
          <div className="relative group mb-10">
            {/* The Circle Container */}
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary via-purple-500 to-secondary animate-gradient-xy">
              <div className="w-full h-full rounded-full bg-[#121212] flex items-center justify-center overflow-hidden border-2 border-[#1a1a1a]">
                {/* Placeholder Icon or Image */}
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full flex items-center justify-center">
                    <span className="text-primary/40 text-xs">NO IMAGE</span>
                  </div>
                )}
              </div>
            </div>

            {/* The Camera Button (Bottom Right) */}
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-1 right-1 p-2 bg-primary text-primary-content rounded-full shadow-lg hover:scale-110 active:scale-90 transition-all border-4 border-[#1a1a1a]"
            >
              <Camera size={18} strokeWidth={2.5} />
            </button>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Form Fields */}
          <div className="w-full space-y-6">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Room XYZ"
                className="w-full px-6 py-4 rounded-2xl bg-[#242424]/50 border border-white/5 focus:border-primary/50 focus:bg-[#242424] focus:outline-none transition-all placeholder:text-gray-600 text-white shadow-inner"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              className="btn btn-primary w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
              onClick={handleCameraClick}
              disabled={isCreatingRoom}
            >
              {isCreatingRoom ? (
                <Loader className="animate-spin" />
              ) : (
                "Create Room"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPopup;
