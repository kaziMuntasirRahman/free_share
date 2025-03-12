import { Link } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import useGetConversation from "../hooks/useGetConversation";
import { useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";

const Navbar = () => {
  const {logOut} = useContext(FirebaseContext)
  const [userInfo, isLoading] = useGetUser()
  const { conversation } = useGetConversation()
  // console.log(conversation)
  const { inbox, outbox } = conversation;
  console.log('inbox: ', inbox?.length)
  console.log('outbox: ', outbox?.length)
  // const { displayName, email, photoURL, savedContent, outbox, likedContent } = userInfo;
  const { displayName, photoURL } = userInfo;

  const handleLogout = async ()=>{
    try{
      await logOut()
    }catch(err){
      console.log(err.message)
    }finally{
      console.log('finally block is executed.')
    }

  }
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
              {
                isLoading?
                  <div className="avatar">
                    <div className="mask mask-squircle w-8 skeleton"/>
                  </div>
                  :
                photoURL ?
                  <div className="avatar">
                    <div className="mask mask-squircle w-8">
                      {/* <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /> */}
                      <img src={photoURL} />
                    </div>
                  </div>
                  :
                  <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-8 rounded-full tooltip" data-tip="Guest" >
                      <span className="text-3xl">G</span>
                    </div>
                  </div>
              }



            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm border border-black">
              {
                displayName ?
                  <>
                    <li>
                      <Link to='/my-profile' className="btn">{displayName}</Link>
                    </li>
                    <li>
                      <Link to='/inbox' className="btn">
                        Inbox <div className="badge badge-sm badge-secondary ">+{inbox?.length}</div>
                      </Link>
                    </li>
                    <li>
                      <div onClick={handleLogout} className="btn btn-error">Logout</div>
                    </li>
                  </>
                  :
                  <li>
                    <Link to='/login' className="btn btn-outline">Login</Link>
                  </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;