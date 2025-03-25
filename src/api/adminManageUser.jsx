//connect authend backend
import axios from "axios";

export const actionGetUserDataAll = (token) => {
  return axios.get("http://localhost:8877/api/admin/user/getUserDataAll", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const actionUpdateUserData = (token, id, value) => {
  return axios.patch("http://localhost:8877/api/admin/user/updateUserData/"+id, value, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const actionDeleteUser = (token, id, value) => {
  return axios.patch("http://localhost:8877/api/admin/user/deleteUser/"+id, value, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const actionGetPatientDataAll = (token) => {
  return axios.get("http://localhost:8877/api/admin/user/getPatientDataAll", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const actionFindPatientByName = (token, value) => {
  return axios.get(`http://localhost:8877/api/admin/user/findPatientByName?name=${value}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

