import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../providers/FirebaseProvider";

const Login = () => {
  const { login, loading } = useContext(FirebaseContext)
  const navigate = useNavigate()
  const [existUser, setExistUser] = useState({
    email: "",
    password: ""
  })

  const handleLogin = async (e) => {
    const { email, password } = existUser;
    e.preventDefault()
    try {
      const response = await login(email, password)
      if (response.email) {
        alert("You've successfully Logged in.")
        navigate('/')
      } else {
        alert("Failed to login.")
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin} className="flex flex-col w-2xs gap-3 p-5 mx-auto border border-black/20 relative">
        {
          loading &&
          <div className="absolute inset-0 flex justify-center items-center z-50 bg-slate-900/40">
          <span className="loader"></span>
        </div>
        }

        <p className="text-center mb-2">Login Now</p>
        <input
          onChange={(e) => setExistUser({ ...existUser, email: e.target.value })}
          type="email"
          className="focus:outline-none input"
          placeholder="enter your email"
          required
        />
        <input
          onChange={(e) => setExistUser({ ...existUser, password: e.target.value })}
          type="password"
          className="focus:outline-none input"
          placeholder="enter your password"
          required
        />
        <button className="btn btn-info text-white">Login</button>

        <p className="text-sm">Don't have an account? <Link className="text-blue-600 hover:underline" to='/register'>Register Now</Link></p>
      </form>
    </div>
  );
};

export default Login;