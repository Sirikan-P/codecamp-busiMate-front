//connect authend backend
import axios from "axios";

//page view booking by status
export const actionGetDriverBooking = async(token,value) =>{
  return await axios.get(`http://localhost:8877/api/driver/booking?status=${value}`, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}

//update status 
export const actionUpdateBookingStatus = async(token,value,id) =>{
  return await axios.patch(`http://localhost:8877/api/driver/booking/${id}`,value, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}