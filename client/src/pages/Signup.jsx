import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { isSigningUp, signup } = useAuthStore();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-6">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-base-100 rounded-[2rem] shadow-2xl overflow-hidden border border-white/5">
        {/* Left Side: The Dynamic DaisyUI Showcase */}
        <div className="relative hidden lg:flex lg:w-1/2 bg-neutral p-12 flex-col justify-between overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-secondary rounded-full blur-[120px]"></div>
          </div>

          {/* Top Section: Badges & Status */}
          <div className="relative z-10 flex flex-wrap gap-2 animate-bounce-slow">
            <div className="badge badge-primary badge-outline gap-2 p-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              System Live
            </div>
            <div className="badge badge-secondary badge-outline p-4">
              v2.4.0-stable
            </div>
          </div>

          {/* Middle Section: Floating Browser Mockup */}
          <div className="relative z-10 perspective-1000">
            <div className="mockup-browser border border-base-content/20 bg-base-300 shadow-2xl transform hover:rotate-2 hover:-translate-y-2 transition-all duration-500 ease-out">
              <div className="mockup-browser-toolbar">
                <div className="input border border-base-content/10 text-xs">
                  www.website.com
                </div>
              </div>
              <div className="flex justify-center px-4 py-16 bg-base-200 gap-4">
                <div className="flex flex-col gap-2 w-24">
                  <div className="h-4 w-full bg-primary/20 rounded-full animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-base-content/10 rounded-full"></div>
                </div>
                <div
                  className="radial-progress text-primary"
                  style={{ "--value": 70, "--size": "3rem" }}
                  role="progressbar"
                >
                  70%
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Real-time Stats */}
          <div className="relative z-10 bg-base-300/50 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <h3 className="text-sm font-bold text-neutral-content/50 uppercase tracking-widest mb-4">
              Network Traffic
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="stat p-0 bg-transparent">
                <div className="stat-title text-[10px]">Uptime</div>
                <div className="stat-value text-primary text-xl font-mono">
                  99.9%
                </div>
              </div>
              <div className="stat p-0 bg-transparent">
                <div className="stat-title text-[10px]">Global Nodes</div>
                <div className="stat-value text-secondary text-xl font-mono">
                  142
                </div>
              </div>
              <div className="stat p-0 bg-transparent">
                <div className="stat-title text-[10px]">Latency</div>
                <div className="stat-value text-accent text-xl font-mono">
                  12ms
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-20 bg-base-100">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <h2 className="text-4xl font-black mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Signup
              </h2>
              <p className="text-base-content/50">
                Enter your credentials to access your terminal.
              </p>
            </div>

            <form className="space-y-6" onSubmit={submitHandler}>
              <div className="group">
                <label className="label text-xs font-bold uppercase text-base-content/40 transition-colors group-focus-within:text-primary">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="admin_root"
                  className="w-full px-5 py-4 rounded-2xl bg-base-200 border-2 border-transparent focus:border-primary/50 focus:bg-base-100 focus:outline-none transition-all duration-300 shadow-inner"
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, username: e.target.value }))
                  }
                  value={formData.username}
                />
              </div>

              <div className="group">
                <div className="flex justify-between items-center mb-1">
                  <label className="label text-xs font-bold uppercase text-base-content/40 transition-colors group-focus-within:text-primary">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-4 rounded-2xl bg-base-200 border-2 border-transparent focus:border-primary/50 focus:bg-base-100 focus:outline-none transition-all duration-300 shadow-inner"
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, password: e.target.value }))
                  }
                />
              </div>

              <button
                className="btn btn-primary w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98]"
                disabled={isSigningUp}
              >
                {isSigningUp ? <Loader className="animate-spin" /> : "Signup"}
              </button>
            </form>

            <div className="divider my-10 text-xs font-bold text-base-content/20 uppercase tracking-tighter">
              Secure Biometric Encrypted
            </div>

            <p className="text-center text-sm text-base-content/40">
              Already have account?{" "}
              <span
                className="text-primary font-bold cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Click here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
