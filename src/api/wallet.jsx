//connect authend backend
import axios from "axios";

//home page driver wallet
export const actionGetDriverWallet = async(token) =>{
  return await axios.get(`http://localhost:8877/api/driver/wallet/`, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}