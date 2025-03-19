//global state 
import { create } from "zustand"
import { persist } from "zustand/middleware"

//api 
import { actionDeleteDriverAddress, actionGetDriver , actionUpdateDriver, actionUpdateDriverAddress } from "../api/driver"

//step 1 : create Store
const driverStored = (set) => ({
  driver: {},
  driverAddress: [],
  driverCurrentLatLng: { lat: 13.750,lng: 100.499} ,
  driverSelectLatLng: { lat: 13.750,lng: 100.499} ,
  //function ,
  actionGetDriverWithZustand : async(token) => {
    try {
        const res = await actionGetDriver(token)         
        const { result } = res.data

        const currentLocation = result.DriverAddress.find(item => item.status === "USE");

        set({
          driver: result,
          driverAddress: result.DriverAddress,
          driverCurrentLatLng: currentLocation 
            ? { lat: parseFloat(currentLocation.lat), lng: parseFloat(currentLocation.long) } 
            : { lat: 13.750,lng: 100.499 } // ค่า default ถ้าไม่เจอค่า
        });
          return { success: true , result } //object
    } catch (error) {          
        return { success: false, error: error.response?.data?.message} 
    }
  },

  actionUpdateDriverWithZustand : async(token,value)=>{
    try {
      const res = await actionUpdateDriver(token,value)
      const { result } = res.data
      set( {driver:result })
      console.log("zustand",result)
      return { success: true , result } //object
    } catch (error) {
        return { success: false, error: error.response?.data?.message} //object
    }
  } ,

  actionSetCurrentLatLong : (latlng)=>{
    set({driverSelectLatLng : latlng                          
     })
  } ,

  actionDeleteDriverAddressWithZustand : async(token,value)=>{
    try {
      const res = await actionDeleteDriverAddress(token,value)
      const { result } = res.data

      set( {driverAddress:result})

      return { success: true , result } //object
    } catch (error) {
      return { success: false, error: error.response?.data?.message} //object
    }
  } ,

  actionUpdateDriverAddressWithZustand : async(token,value)=>{
    try {
      const res = await actionUpdateDriverAddress(token,value)
      const { result } = res.data

      const currentLocation = result.find(item => item.status === "USE");

      set( {
        driverAddress:result,
        driverCurrentLatLng: currentLocation 
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
const useDriverStored = create(persist(driverStored,{name:'driver-store'})) //persist = localstorage 

export default useDriverStored