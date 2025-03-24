//connect authend backend
import axios from "../lib/axios.js";

export const actionCurrentUser = async () =>{
  return await axios.get('http://localhost:8877/user'
     )}

// export const actionCurrentDriver = async (token) =>{
//   console.log(token);
//   return await axios.get('http://localhost:8877/user', {
//       headers:{
//           Authorization: `Bearer ${token}`
//       }
//   })}
