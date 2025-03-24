//connect authend backend
import axios from "axios";

export const actionGetBookingDataByDate = (token, date) => {
  return axios.get(`http://localhost:8877/api/admin/dashboard/bookingDataByDate?date=${date}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

