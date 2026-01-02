import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, authUser } = useAuthStore();
  return (
    <nav className="w-full border border-transparent border-b-white/20 bg-[#121212] shadow-md py-2 relative z-20">
      <div className="w-full mx-auto px-4 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div
            className="shrink-0 flex items-center justify-center cursor-pointer gap-3"
            onClick={() => navigate("/")}
          >
            <img
              className="size-12 w-auto"
              src="/favicon.ico" // Replace with your logo path
              alt="Logo"
            />
            <p className="text-2xl tracking-wide font-semibold">
              {" "}
              Talk
              <span className="text-purple-500"> Radius</span>
            </p>
          </div>

          {/* Logout Button */}
          <div>
            {authUser && (
              <button
                className="btn btn-outline size-10 btn-circle btn-sm btn-primary flex items-center gap-2 text-white border-white hover:bg-white/10"
                onClick={() => logout()}
              >
                <LogOut size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
