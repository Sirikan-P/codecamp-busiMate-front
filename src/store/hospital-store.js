
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { actionGetHospital } from "../api/userBooking";



const hospitalStore = (set) => ({
  hospital: [], 
  setHospital: (newHospitalData) => set({ hospital: newHospitalData }),
  fetchHospitalData: async(value) => {
    try {
      const hospitalData = await actionGetHospital();
    set({ hospital: hospitalData.data });
    // return hospital
} catch (error) {
      console.log(error);
    }
    
  }}
)
  

// 
const useHospitalStore = create(persist(hospitalStore, {name: 'hospital-store'}))

export default useHospitalStore;