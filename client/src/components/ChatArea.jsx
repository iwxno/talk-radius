import { useEffect, useRef, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useMessageStore from "../store/useMessageStore";
import { X } from "lucide-react";

function ChatArea() {
  const { getMessages, messages, selectedRoom, gettingMessages } =
    useMessageStore();
  const { authUser } = useAuthStore();

  const [image, setImage] = useState("");
  const messageEndRef = useRef(null);
  useEffect(() => {
    getMessages();
  }, [getMessages, selectedRoom]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="flex-1 overflow-y-auto px-2 py-2 sm:py-8 sm:px-8 space-y-4">
      {image && (
        <div className="bg-black/60 backdrop-blur-md w-full h-screen fixed top-0 left-0 z-50 cursor-default flex items-center justify-center py-4 flex-col">
          <X
            className="cursor-pointer absolute top-5 right-5"
            onClick={() => setImage("")}
          />
          <div className="w-[90%] md:w-[80%]">
            <img src={image} alt="Image" className="w-full rounded-xl" />
          </div>
        </div>
      )}
      {messages.length !== 0 ? (
        messages.map((message) => (
          <div
            ref={messageEndRef}
            key={message._id}
            className={`chat  scale-90 sm:scale-100 ${
              message.from._id === authUser?._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-header text-base text-gray-300">
              {message.from?.username}
            </div>
            <div className="chat-bubble h-auto  max-w-[220px] bg-[#333] text-white md:max-w-md rounded-2xl rounded-tr-none p-2 border border-white/10 shadow-sm">
              {message.image && (
                <div className="w-full">
                  <img
                    src={message.image}
                    className="h-full w-full cursor-pointer rounded-2xl rounded-tr-none "
                    onClick={() => setImage(message.image)}
                  />
                </div>
              )}
              <p
                className="mx-3 wrap-break-word max-w-md text-base"
                style={{
                  marginTop: message.text && message.image && "12px",
                }}
              >
                {message.text}
              </p>
            </div>
            <div className="chat-footer opacity-40 text-[10px] mt-2 mr-1">
              {new Date(message.createdAt).getHours() +
                ":" +
                new Date(message.createdAt).getMinutes()}
            </div>
          </div>
        ))
      ) : gettingMessages ? (
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
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default ChatArea;
