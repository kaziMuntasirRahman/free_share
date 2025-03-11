import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/shared/Home";
import Discover from "../pages/shared/Discover";

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
        path: '/discover',
        element: <Discover />
      }
    ]
  }
])


export default router;