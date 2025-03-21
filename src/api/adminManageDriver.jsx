//connect authend backend
import axios from "axios";

export const actionGetDriverDataAll = (token) => {
  return axios.get("http://localhost:8877/api/admin/user/getDriverDataAll", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const actionFindDriverByName = (token, value) => {
  return axios.get(`http://localhost:8877/api/admin/user/findDriverByName?name=${value}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const actionUpdateDriverData = (token, id, value) => {
  return axios.patch("http://localhost:8877/api/admin/user/updateDriverData/"+id, value, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const actionDeleteDriver = (token, id, value) => {
  return axios.patch("http://localhost:8877/api/admin/user/deleteDriver/"+id, value, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

