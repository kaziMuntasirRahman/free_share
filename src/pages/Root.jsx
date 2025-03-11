import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div className="max-w-7xl mx-auto h-full min-h-screen border border-black/10">
      <Navbar />
      {/* this is root page */}
      <div className="px-3 py-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;