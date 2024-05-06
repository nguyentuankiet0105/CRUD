import {
 createBrowserRouter,
} from "react-router-dom";
import Home from '@pages/Home.tsx'
import ErrorPage from '@pages/ErrorPage.tsx'
import UserManagement from '@pages/UserManagement';
import Login from '@pages/Login';

const router = createBrowserRouter([
 {
  path: "/",
  element: <Home />,
  errorElement: <ErrorPage />,
  children: [
   {
    path: "users",
    element: <UserManagement />,
   },
  ]
 },
 {
  path: "login",
  element: <Login />,
 },
]);

export { router }