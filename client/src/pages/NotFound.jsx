import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute top-0 left-0 min-h-screen bg-slate-950 flex flex-col items-center justify-center w-full z-10 overflow-hidden font-sans">
      {/* Decorative Glowing Border */}
      <div className="absolute inset-4 border-2 border-purple-500/30 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.2)] pointer-events-none"></div>

      {/* Floating Chat Bubble Accents (Background) */}
      <div className="absolute top-1/4 left-10 opacity-10 scale-150 transform -rotate-12 text-purple-400">
        <svg width="100" height="100" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 right-10 opacity-10 scale-125 transform rotate-12 text-purple-500">
        <svg width="80" height="80" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 px-4">
        {/* Large 404 Text with Glitch Gradient */}
        <h1 className="text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500 drop-shadow-[0_0_35px_rgba(34,211,238,0.5)] animate-pulse">
          404
        </h1>

        <h2 className="text-3xl font-bold text-white mt-4 tracking-tight">
          Page Not Found
        </h2>

        <p className="text-slate-400 mt-2 max-w-xs mx-auto">
          It seems you've wandered off the conversational path.
        </p>

        {/* DaisyUI Button to go home */}
        <button
          className="btn btn-outline btn-cyan mt-8 rounded-full px-8 border-purple-500/50 hover:bg-purple-500/10"
          onClick={() => navigate("/")}
        >
          Back to Chat
        </button>
      </div>

      {/* Logo Section (Bottom Center) */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        {/* Placeholder for your Owl Logo */}
        <div className="p-2 bg-slate-900 border border-purple-500/50 rounded-full shadow-lg shadow-purple-500/20">
          <div className="w-12 h-12 text-purple-400 p-0">
            <img src="/favicon.ico" className="w-full h-full" />
          </div>
        </div>
        <span className="text-2xl font-black text-white tracking-[0.2em] uppercase">
          <span className="text-purple-600">Talk</span> Radius
        </span>
      </div>
    </div>
  );
};

export default NotFound;
