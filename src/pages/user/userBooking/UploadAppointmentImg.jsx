import React from 'react'
import { actionPostImg } from '../../../api/userBooking';
import Swal from "sweetalert2";
import useUserBookingStore from '../../../store/booking-store';


function UploadAppointmentImg() {
const userBooking = useUserBookingStore((state) => state.userbooking)
const setUserBooking = useUserBookingStore((state) => state.setUserBooking)
console.log(userBooking);
      // Upload Image
      const handleImageUpload = async (event) => {
        const image = event.target.files[0];
    
        const formData = new FormData();
        formData.append("image", image);
        formData.append("upload_preset", "ml_default"); // ใช้ upload_preset จาก Cloudinary
        formData.append("cloud_name", "dtoly6hc2"); // ตรวจสอบว่าเป็น Cloud Name ของคุณจริงๆ
        console.log(formData);
    
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
      
        try {
          const response = await actionPostImg(formData, {}); // เรียกใช้ API Upload
        } catch (error) {
          console.error("Upload error:", error);
          Swal.fire({
            title: "Upload Failed",
            text: "Failed to upload image. Please try again.",
            icon: "error",
          });
        }
      };
      
      return (
        <div className="flex flex-col justify-center w-full place-items-center mb-15 bg-cyan-600 ">
          <div className=" rounded-2xl shadow-2xl w-100 bg-white flex flex-col place-items-center pb-20 mt-10 p-5 gap-5 ">
            {/* Make Booking Title */}
            <div className="text-3xl pt-5 pb-5 font-semibold text-cyan-600">
              New Booking
            </div>
    
           
            {/* upload image */}
            <div className="flex flex-col gap-2 w-full text-cyan-600 font-semibold">
              <label className="text-xl text-cyan-600 font-semibold">
                Upload Appointment Image(Hospital Appointment)
                <input
                  type="file"
                  className="mt-2 w-full border-2 border-slate-300 p-2 rounded-md text-pink-800 textarea-lg"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {/* {booking.appointmentImage && (
                  <img
                    src={booking.appointmentImage}
                    alt="Uploaded"
                    className="mt-4 w-40 h-40 object-cover rounded-md"
                  />
                )} */}
              </label>
            </div>
           
          </div>
          {/* button */}
          <button
            className="bg-cyan-700 w-80 text-xl text-slate-300 p-2 rounded-md mt-10 h-[64px] shadow-2xl"
          >
            Confirm Booking
          </button>
        </div>
      );
}

export default UploadAppointmentImg