import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Signup";
import useAuthStore from "./store/useAuthStore";
import Login from "./pages/Login";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Home from "./pages/Home";
import useRoomStore from "./store/useRoomStore";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";

function App() {
  const { authUser, gettingAuthUser, getUser } = useAuthStore();
  const { refreshCoords } = useRoomStore();

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      refreshCoords();
    };
    fetchData();
  }, [refreshCoords, getUser]);

  if (gettingAuthUser) {
    return (
      <div
        data-theme="dark"
        className="h-screen w-full flex items-center justify-center"
      >
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme="dark">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ToastContainer autoClose="1200" />
    </div>
  );
}
export default App;
