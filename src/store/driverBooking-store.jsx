//global state 
import { create } from "zustand"
import { persist } from "zustand/middleware"

//api 

//step 1 : create Store
const driverBookingStored = (set) => ({

  
})
//step 2 : export Store
//const useDriverBookingStored = create(persist(driverBookingStored,{name:'driverBooking-store'})) //persist = localstorage 
const useDriverBookingStored = create(driverBookingStored)
export default useDriverBookingStored