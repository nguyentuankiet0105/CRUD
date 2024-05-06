import { Outlet } from "react-router-dom";

const Home = () => {
 return (
  <>
   <h1>Dashboard</h1>
   <Outlet />
  </>
 )
}

export default Home