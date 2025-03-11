import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";

const imgbb_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

const Register = () => {
  const navigate = useNavigate()
  const { createUser } = useContext(FirebaseContext)
  const axiosPublic = useAxiosPublic()
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: null
  })


  const handleRegister = async (e) => {
    e.preventDefault();
    const imageFile = { image: newUser.photoURL }; // Wrap the image file
    const { name, email, password, photoURL } = newUser;
    let imgURL = '';

    try {
      if (newUser.photoURL) {
        const res = await axios.post(imgbb_api_url, imageFile, {
          headers: {
            "content-type": "multipart/form-data", // Ensure the file is uploaded correctly
          },
        })
        console.log(res.data);
        if (res.data.status) {
          imgURL = res.data.data.url;

        } else { // if the image failed to upload
          console.log("Failed to upload image.")
        }
        console.log(imgURL)
      }
      const response = await createUser(name, email, password, imgURL);
      if (response.email) {
        alert("You've successfully signed in to FreeShare!");

        const modifiedUser = {
          displayName: name,
          email,
          photoURL: imgURL,
          password
        };
        const result = await axiosPublic.post('users', modifiedUser);
        console.log(result.data);
        setTimeout(() => navigate('/'), 1500);
      } else {
        alert("Sorry! Failed to create account.")
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      console.log("finally block run")
    }
  }

  return (
    <div>
      <p>Register Now</p>
      <p>Already have an account? <Link className="text-blue-600" to='/login'>Login Now</Link></p>
      <form onSubmit={handleRegister} className="flex flex-col w-2xs gap-3 p-5 mx-auto border border-black/20">
        <input
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          type="text"
          className="focus:outline-none input"
          placeholder="enter your name"
          required
        />
        <input
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          type="email"
          className="focus:outline-none input"
          placeholder="enter your email"
          required
        />
        <input
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          type="password"
          className="focus:outline-none input"
          placeholder="enter your password"
          required
        />
        <input
          onChange={(e) => setNewUser({ ...newUser, photoURL: e.target.files[0] })}
          type="file"
          className="file-input file-input-neutral focus:outline-none"
          placeholder="enter your photo url"
        />
        <button className="btn btn-info">Register</button>

      </form>
    </div>
  );
};

export default Register;