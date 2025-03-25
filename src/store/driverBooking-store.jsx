//global state 
import { create } from "zustand"
import { persist } from "zustand/middleware"

//api 

//step 1 : create Store
const driverBookingStored = (set) => ({
  myBooking : [] ,
  actionGetMybookingWithZustand : async(token,status)=>{     
      try {  
        const res = await actionGetDriverBooking(token,status)
        const { result } = res.data

        set( {myBooking:result })
        console.log(myBooking)
        return { success: true , result }
      } catch (error) {
        return { success: false, error: error.response?.data?.message} 
      }
    }
  
})
//step 2 : export Store
//const useDriverBookingStored = create(persist(driverBookingStored,{name:'driverBooking-store'})) //persist = localstorage 
const useDriverBookingStored = create(driverBookingStored)
export default useDriverBookingStored