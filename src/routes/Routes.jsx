import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/shared/Home";
import AllPublicContent from "../pages/shared/AllPublicContent";

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
        element: <AllPublicContent />
      }
    ]
  }
])


export default router;