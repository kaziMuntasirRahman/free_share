import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <p>Login to access more</p>
      <p>new here? <Link className="text-blue-600" to='/register'>Register Now</Link></p>
    </div>
  );
};

export default Login;