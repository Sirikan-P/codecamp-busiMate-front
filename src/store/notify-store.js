//global state 
import { create } from "zustand"
import { persist } from "zustand/middleware"

//api 

//step 1 : create Store
const notifyStored = (set) => ({
  socketUsers : [] ,
  socketData : [] ,
  socketResult : [] ,
  //
  actionSetSocketUsers : (data)=>{
    console.log('zustand',data)
    set(( state ) => ({ socketUsers: [...state.socketUsers, data ] } )) 
    //set({socketData:data})
  } ,
  actionSetSocketData : (data)=>{
    console.log('zustand',data)
    set(( state ) => ({ socketData : [...state.socketData, data ] } )) 
    //set({socketData:data})
  } ,
  actionSetSocketResult : (data)=>{
    console.log('zustand',data)
    set(( state ) => ({ socketResult : [...state.socketResult, data ] } )) 
    //set({socketData:data})
  } ,

})
//step 2 : export Store
//const useDriverBookingStored = create(persist(driverBookingStored,{name:'driverBooking-store'})) //persist = localstorage 
const useNotifyStored = create(notifyStored)
export default useNotifyStored