import { useLocation } from "react-router-dom";
import { TUser } from "@interfaces/user-interface"
import { useEffect, useState } from "react";


const UserDetail = () => {
 const location = useLocation();

 const [userItem, setUserItem] = useState<TUser>({} as TUser);

 useEffect(() => {
  if (location.state.user) {
   setUserItem(location.state.user);
  }
 }, [location.state.user]);

 return (
  <>
   <h1>UserDetail</h1>
   <div>{userItem.id}</div>
   <div>{userItem.name}</div>
   <div>{userItem.phone}</div>
   <div>{userItem.role}</div>
  </>
 );
};

export default UserDetail