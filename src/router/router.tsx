import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "../pages/notFound/NotFoundPage";
import History from "../pages/history/History";
import Contacts from "../pages/contacts/Contacts";
import Graph from "../pages/mqtt/Graph";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "dashboard",
    element: <PrivateRoute />,
    children: [{ path: "", element: <Dashboard /> }],
  },
  {
    path: "history",
    element: <History />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path:"kontakter",
    element: <Contacts />,
  },
  {
    path:"graph",
    element: <Graph/>,
  }
]);

export default router;
