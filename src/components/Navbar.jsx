import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="max-w-screen">
      <div className="navbar bg-base-100 shadow-sm mb-4">
        <div className="flex-1">
          <Link to='/' className="btn btn-ghost text-xl">FreeShare</Link>
        </div>
        <div className="flex-none">
          <Link to='/' className="btn btn-ghost text-xl">Home</Link>
          <Link to='/discover' className="btn btn-ghost text-xl">Discover</Link>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Name of the user"
                src="https://i.ibb.co.com/JFSYkc6N/GL744ll-Xc-AA8a-S7.jpg" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;