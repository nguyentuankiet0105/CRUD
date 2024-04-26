import {
 createBrowserRouter,
} from "react-router-dom";
import ErrorPage from '@pages/ErrorPage.tsx'
import UserManagement from '@pages/UserManagement';
import Login from '@pages/Login';

const router = createBrowserRouter([
 {
  path: "/",
  element: <UserManagement/>,
  errorElement: <ErrorPage/>
 },
 {
  path: "login",
  element: <Login/>,
 },
]);

export { router }