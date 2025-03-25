//connect authend backend
import axios from "axios";

//home page user
export const actionGetUser = async(token) =>{
  return await axios.get(`http://localhost:8877/api/user/me`, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}

export const actionUpdateUser = async(token,value) =>{
  return await axios.patch(`http://localhost:8877/api/user/me`,value, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}
//----Address
export const actionCreateUserAddress = async(token,value) =>{
  return await axios.post(`http://localhost:8877/api/user/address`,value, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}

export const actionUpdateUserAddress = async(token,value) =>{
  return await axios.patch(`http://localhost:8877/api/user/address`,value, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}

export const actionDeleteUserAddress = async(token,value) =>{
  console.log('axios',token,value)
  return await axios.delete(`http://localhost:8877/api/user/address/${value}`, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}