//global state 
import { create } from "zustand"
import { persist } from "zustand/middleware"

//api 

//step 1 : create Store
const notifyStored = (set) => ({
  socketUsersReq : [] ,
  socketData : [] ,
  //socketResult : [] ,
  //
  actionSetSocketUsersReq : (data)=>{
    console.log('zustand use log',data)
    set((state) => {
      // ตรวจสอบว่ามี object ที่มีค่า id ซ้ำอยู่ใน state.socketData หรือไม่
      const isDuplicate = state.socketUsersReq.some(item => item.id === data.id);
  
      if (!isDuplicate) {
        return { socketUsersReq: [...state.socketUsersReq, data] };
      }
  
      return state; // ถ้ามีซ้ำ ไม่ต้องอัพเดต state
    });
  } ,
  actionSetSocketData : (data)=>{
    console.log('zustand driver log',data)
    set((state) => {
      // ตรวจสอบว่ามี object ที่มีค่า id ซ้ำอยู่ใน state.socketData หรือไม่
      const isDuplicate = state.socketData.some(item => item.id === data.id);
  
      if (!isDuplicate) {
        return { socketData: [...state.socketData, data] };
      }
  
      return state; // ถ้ามีซ้ำ ไม่ต้องอัพเดต state
    });
  } ,
  
  actionClearSocketUsersReq : (bookingId)=>{    
    console.log("updatedData1",bookingId)
  },

  actionClearSocketData : (bookingId)=>{
    //const updatedData = socketData.filter(item => item.id !== bookingId);
    console.log("updatedData2",bookingId)

  }

})
//step 2 : export Store
const useNotifyStored = create(persist(notifyStored,{name:'notify-store'})) //persist = localstorage 
//const useNotifyStored = create(notifyStored)
export default useNotifyStored