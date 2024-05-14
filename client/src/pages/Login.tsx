import { useState } from "react";
import api from "@axios/axios"

const Login = () => {
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");

 const login = (e) => {
  e.preventDefault();
  console.log(username, password);
  try {
   api.post("/auth/login", { username, password }).then((res) => {
    console.log(res);
   })
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <>
   <form onSubmit={(e) => login(e)}>
    <input
     type="text"
     name="username"
     value={username}
     onChange={(e) => setUsername(e.target.value)}
    />
    <input
     type="text"
     name="password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
    />
    <button type="submit">SUBMIT</button>
   </form>
  </>
 );
};

export default Login