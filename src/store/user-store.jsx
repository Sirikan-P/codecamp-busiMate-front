//global state 
import { create } from "zustand"
import { persist } from "zustand/middleware"

//api 
import { actionDeleteUserAddress, actionGetUser, actionUpdateUser, actionUpdateUserAddress } from "../api/user"

//step 1 : create Store
const userStored = (set) => ({
  user: {},
  userAddress: [],
  userCurrentLatLng: { lat: 13.750,lng: 100.499} ,
  userSelectLatLng: { lat: 13.750,lng: 100.499} ,
  //function ,
  actionGetUserWithZustand : async(token) => {
    try {
        const res = await actionGetUser(token)         
        const { result } = res.data

        const currentLocation = result.UserAddress.find(item => item.status === "USE");

        set({
          user: result,
          userAddress: result.DriverAddress,
          userCurrentLatLng: currentLocation 
            ? { lat: parseFloat(currentLocation.lat), lng: parseFloat(currentLocation.long) } 
            : { lat: 13.750,lng: 100.499 } // ค่า default ถ้าไม่เจอค่า
        });
          return { success: true , result } //object
    } catch (error) {          
        return { success: false, error: error.response?.data?.message} 
    }
  },

  actionUpdateUserWithZustand : async(token,value)=>{
    try {
      const res = await actionUpdateUser(token,value)
      const { result } = res.data
      set( {user:result })
      console.log("zustand",result)
      return { success: true , result } //object
    } catch (error) {
        return { success: false, error: error.response?.data?.message} //object
    }
  } ,

  actionSetCurrentLatLong : (latlng)=>{
    set({userSelectLatLng : latlng                          
     })
  } ,

  actionDeleteUserAddressWithZustand : async(token,value)=>{
    try {
      const res = await actionDeleteUserAddress(token,value)
      const { result } = res.data

      set( {driverAddress:result})

      return { success: true , result } //object
    } catch (error) {
      return { success: false, error: error.response?.data?.message} //object
    }
  } ,

  actionUpdateUserAddressWithZustand : async(token,value)=>{
    try {
      const res = await actionUpdateUserAddress(token,value)
      const { result } = res.data

      const currentLocation = result.find(item => item.status === "USE");

      set( {
        userAddress:result,
        userCurrentLatLng: currentLocation 
        ? { lat: parseFloat(currentLocation.lat), lng: parseFloat(currentLocation.long) }
        : { lat: 13.750,lng: 100.499 } // ค่า default ถ้าไม่เจอค่า
        })
        return { success: true , result } //object
    } catch (error) {
      return { success: false, error: error.response?.data?.message} //object
    }
  } 

})
//step 2 : export Store
const useUserStored = create(persist(userStored,{name:'user-store'})) //persist = localstorage 

export default useUserStored