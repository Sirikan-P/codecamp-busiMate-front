//connect authend backend
import axios from "axios";
import { axiosInstance } from "../lib/axios"

// GetAllBooking
export const actionGetUserBooking = async () =>{
  return await axiosInstance.get('http://localhost:8877/api/user/booking/get')
}

// GetOneBooking
export const actionGetOneUserBooking = async (id) =>{
  return await axiosInstance.get(`http://localhost:8877/api/user/booking/get/${id}`)
}

// CreateUserBooking
export const actionCreateUserBooking = async ( data) =>{
  console.log(data);
  return await axiosInstance.post('http://localhost:8877/api/user/booking/create', data)
}

// FindDriver
export const actionFindDriver = async (data) =>{
  return await axiosInstance.post('http://localhost:8877/api/user/booking/finddriver', data)
}

// FindNewDriver
export const actionFindNewDriver = async (data) =>{
  return await axiosInstance.post('http://localhost:8877/api/user/booking/findNewdriver', data)
}

export const actionNewdriver = async (data) =>{
  return await axiosInstance.patch('http://localhost:8877/api/user/booking/updateNewdriver', data)
}

// getHospital
export const actionGetHospital = async () =>{
  return await axios.get('http://localhost:8877/api/user/hospital/')
}

export const actionPostImg = async (formData) => {
  try {
    const response = await axiosInstance.post('http://localhost:8877/api/user/booking/upload', formData)
    return response.data;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

