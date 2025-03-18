//global state 
import { create } from "zustand"
import { persist } from "zustand/middleware"

//api 
import { actionGetDriver , actionUpdateDriver } from "../api/driver"

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

        const currentLat = result.DriverAddress
        .filter(item => item.status === "USE") // เลือกเฉพาะ status = "USE"
        .map(item => item.lat); // ดึงค่า lat
        const currentLong = result.DriverAddress
        .filter(item => item.status === "USE") // เลือกเฉพาะ status = "USE"
        .map(item => item.long); // ดึงค่า lat

        set( {driver:result,
              driverAddress:result.DriverAddress,
              driverCurrentLatLng : {lat: currentLat,lng: currentLong}
              })
        
        return { success: true , result } //object
    } catch (error) {          
        return { success: false, error: error.response?.data?.message} 
    }
  },

  actionUpdateDriverWithZustand : async(token,value)=>{
    try {
      const res = await actionUpdateDriver(token,value)
      const { result } = res.data
      set( {driver:result ,
            driverAddress:result.DriverAddress})
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
      return { success: true , result } //object
    } catch (error) {
      return { success: false, error: error.response?.data?.message} //object
    }
  }

})
//step 2 : export Store
const useDriverStored = create(driverStored)

export default useDriverStored