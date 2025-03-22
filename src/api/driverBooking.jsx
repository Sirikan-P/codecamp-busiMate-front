//connect authend backend
import axios from "axios";

//page view booking by status
export const actionGetDriverBooking = async(token,value) =>{
  return await axios.get(`http://localhost:8877/api/driver/booking?${value}`, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}