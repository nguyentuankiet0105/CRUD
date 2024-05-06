import { Outlet } from "react-router-dom";

const Home = () => {
 return (
  <>
   <h1 className="header">header</h1>
   <Outlet />
   <h1 className="footer">footer</h1>
  </>
 )
}

export default Home