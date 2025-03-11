import { Link } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";

const Navbar = () => {
  const [userInfo] = useGetUser()
  const { displayName, email, photoURL, savedContent, inbox, outbox, likedContent } = userInfo
  return (
    <nav className="max-w-screen">
      <div className="navbar bg-base-100 shadow-sm mb-4">
        <div className="flex-1">
          <Link to='/' className="btn btn-ghost text-xl">FreeShare</Link>
        </div>
        <div className="flex-none">
          <Link to='/' className="text-lg hover:link mr-3">Home</Link>
          <Link to='/my-contents' className="text-lg hover:link mr-3">My Contents</Link>
          <Link to='/discover' className="text-lg hover:link mr-3">Discover</Link>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              <div className="avatar">
                <div className="mask mask-squircle w-8">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm border border-black">
              <li>
                <Link to='/login' className="btn btn-outline">Login</Link>
              </li>
              <li>
                <button className="btn btn-outline">
                  Inbox <div className="badge badge-sm badge-secondary ">+{inbox.length}</div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;