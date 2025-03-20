
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { actionGetUserBooking } from "../api/userBooking";



const userbookingStore = (set) => ({
  userbooking: [], 
  setUserBooking: (newBookingData) => set({ userbooking: newBookingData }),
  showOneBook: [],
  setShowOneBook: (newBookingData) => set({ showOneBook: newBookingData }),
  allBooking: [],
  setAllBooking: (newBookingData) => set({ allBooking: newBookingData }),
  selectDriver: [],
  setSelectDriver : (newSelectDriver) => set({ selectDriver: newSelectDriver}),
  fetchAllBookingData: async () => {
    try {
      const allBookingData = await actionGetUserBooking();
      set({ allBooking: allBookingData.data });
    } catch (error) {
      console.log(error);
    }
  }
//   fetchBookingData: async(value) => {
//     try {
//       const bookingData = await actionCreateUserBooking();
//     set({ booking: bookingData.data });

// } catch (error) {
//       console.log(error);
//     }
    
//   }
}
)
  

// 
const useUserBookingStore = create(persist(userbookingStore, {name: 'userbooking-store'}))

export default useUserBookingStore;