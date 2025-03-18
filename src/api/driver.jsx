//connect authend backend
import axios from "axios";

//home page driver 
export const actionGetDriver = async(token) =>{
  return await axios.get(`http://localhost:8877/api/driver/me`, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}

export const actionUpdateDriver = async(token,value) =>{
  return await axios.patch(`http://localhost:8877/api/driver/me`,value, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}

export const actionDeleteDriverAddress = async(token,value) =>{
  return await axios.delete(`http://localhost:8877/api/driver/me`,value, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}