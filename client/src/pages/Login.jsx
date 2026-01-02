import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Loader } from "lucide-react";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const { isLoggingIn, login } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row-reverse w-full max-w-5xl bg-base-100 rounded-[2rem] shadow-2xl overflow-hidden border border-white/5">
        {/* Right Side: The Chat Preview (Dynamic Side) */}
        <div className="relative hidden lg:flex lg:w-1/2 bg-primary/5 items-center justify-center p-12 overflow-hidden border-l border-white/5">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>

          <div className="relative z-10 w-full max-w-sm space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-base-content">
                Connect instantly.
              </h3>
              <p className="text-sm text-base-content/50">
                Join to chat in 2km radius
              </p>
            </div>

            {/* Live Chat Mockup using DaisyUI Bubbles */}
            <div className="space-y-4">
              <div className="chat chat-start animate-fade-in-up">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full bg-base-300 p-1">
                    <div className="w-full h-full rounded-full bg-secondary/30"></div>
                  </div>
                </div>
                <div className="chat-bubble bg-base-200 text-base-content border border-white/5">
                  Hey! Did you see the new UI? 🚀
                </div>
              </div>

              <div className="chat chat-end animate-fade-in-up delay-150">
                <div className="chat-bubble chat-bubble-primary text-primary-content font-medium">
                  Yeah, it looks super clean. Love the dark mode!
                </div>
              </div>

              <div className="chat chat-start animate-fade-in-up delay-300">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full bg-base-300 p-1">
                    <div className="w-full h-full rounded-full bg-secondary/30"></div>
                  </div>
                </div>
                <div className="chat-bubble bg-base-200 text-base-content border border-white/5">
                  Type 'Hello' to start the room.
                </div>
              </div>
            </div>

            {/* Simple Dynamic Indicator */}
            <div className="flex items-center justify-center gap-4 bg-base-200/50 py-3 rounded-2xl backdrop-blur-md border border-white/5">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-base-100 bg-primary/40"></div>
                <div className="w-8 h-8 rounded-full border-2 border-base-100 bg-secondary/40"></div>
                <div className="w-8 h-8 rounded-full border-2 border-base-100 bg-accent/40"></div>
              </div>
              <span className="text-xs font-semibold text-base-content/60">
                Online Friends
              </span>
            </div>
          </div>
        </div>

        {/* Left Side: The Simple Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl font-black text-primary mb-3">
                Welcome Back
              </h2>
              <p className="text-base-content/60 font-medium">
                Log in to your chat account
              </p>
            </div>

            <form className="space-y-5" onSubmit={submitHandler}>
              {/* Custom Username Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-base-content/40 ml-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your handle"
                  className="w-full px-6 py-4 rounded-2xl bg-base-200 border-2 border-transparent focus:border-primary/40 focus:bg-base-300 focus:outline-none transition-all duration-300 shadow-sm"
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, username: e.target.value }))
                  }
                  value={formData.username}
                />
              </div>

              {/* Custom Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-base-content/40">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-6 py-4 rounded-2xl bg-base-200 border-2 border-transparent focus:border-primary/40 focus:bg-base-300 focus:outline-none transition-all duration-300 shadow-sm"
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, password: e.target.value }))
                  }
                  value={formData.password}
                />
              </div>

              <div className="pt-2">
                <button
                  className="btn btn-primary w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Sign In to Chat"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-10 text-center">
              <p className="text-sm text-base-content/40">
                Don't have an account yet?
                <span
                  className="text-primary font-bold ml-2 hover:underline"
                  onClick={() => navigate("/signup")}
                >
                  Create one
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
