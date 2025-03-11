import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/shared/Home";
import Discover from "../pages/shared/Discover";
import MyContents from "../pages/shared/MyContents";
import Login from "../pages/shared/Login";
import Register from "../pages/shared/Register";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/my-contents',
        element: <MyContents />
      },
      {
        path: '/discover',
        element: <Discover />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
])


export default router;