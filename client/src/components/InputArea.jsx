import { Image, SendHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useMessageStore from "../store/useMessageStore";
function InputArea() {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [imagePrew, setImagePrew] = useState("");

  const { sendMessage } = useMessageStore();

  const btnRef = useRef(null);
  const inputRef = useRef(null);

  const handleMessage = () => {
    sendMessage(text, image);
    setText("");
    setImage("");
    setImagePrew("");
  };
  const ref = useRef(null);
  const handleImageclick = (e) => {
    const file = ref.current.files[ref.current.files.length - 1];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePrew(url);

    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };
  const removeImg = () => {
    setImagePrew("");
    setImage("");
  };

  return (
    <div className="sm:p-6 p-2 relative">
      {imagePrew && (
        <div className="bg-[#1a1a1a] w-32 rounded-t-xl ml-2 p-1 relative">
          <button
            className="absolute top-2 right-2 cursor-pointer bg-gray-500/60 rounded-full"
            onClick={() => removeImg()}
          >
            <X />
          </button>
          <img src={imagePrew} className="w-full h-full rounded-t-xl" />
        </div>
      )}
      <div className="relative flex items-center bg-[#1a1a1a] rounded-xl p-1 sm:p-2 border border-white/5">
        <textarea
          placeholder="Type here"
          autoFocus
          ref={inputRef}
          value={text}
          className="w-full bg-transparent border-none p-1 sm:px-4 sm:py-3 focus:outline-none text-sm text-white placeholder:text-gray-600 resize-none overflow-hidden"
          rows={1}
          maxLength={320}
          onChange={(e) => setText(e.target.value)}
          onInput={(e) => {
            const el = e.target;
            el.style.height = "auto"; // reset
            el.style.height = el.scrollHeight + "px"; // grow
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // IMPORTANT
              btnRef.current.click();
            }
          }}
        />
        {
          <input
            type="file"
            accept="image/"
            ref={ref}
            className="hidden"
            onInput={handleImageclick}
          />
        }
        <button
          className="p-2 text-gray-500 hover:text-white transition-colors"
          onClick={() => ref.current.click()}
        >
          <Image size={22} />
        </button>

        <button
          className="p-2 text-gray-500 hover:text-white transition-colors"
          onClick={() => handleMessage()}
          ref={btnRef}
        >
          <SendHorizontal size={22} />
        </button>
      </div>
    </div>
  );
}
export default InputArea;
