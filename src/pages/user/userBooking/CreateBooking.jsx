import { act, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CircleCheckBig, CircleDashed, Loader } from "lucide-react";

import Calendar from "react-calendar";
import SelectHospital from "../../../components/booking/SelectHospital";
import SelectUserAddress from "../../../components/booking/SelectUserAddress";
import SelectAssistance from "../../../components/booking/SelectAssistance";
import SelectWheelChair from "../../../components/booking/SelectWheelChair";
import SelectPatient from "../../../components/booking/SelectPatient";
import SelectCarType from "../../../components/booking/SelectCarType";
import useUserBookingStore from "../../../store/booking-store";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import {
  actionCreateUserBooking,
  actionFindDriver,
  actionGetOneUserBooking,
  actionPostImg,
} from "../../../api/userBooking";
import { use } from "react";
import elder02 from "../../../assets/elder02.jpg";

function CreateBooking() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setUserBooking = useUserBookingStore((state) => state.setUserBooking);
  const setSelectDriver = useUserBookingStore((state) => state.setSelectDriver);
  const setBookingwithId = useUserBookingStore(
    (state) => state.setBookingwithId
  );
  const userbooking = useUserBookingStore((state) => state.userbooking);
  const [progress, setProgress] = useState(0);

  const [booking, setBooking] = useState({
    needWheelChair: "",
    needAssist: "",
    appointmentDate: "",
    appointmentImage: "",
    specialRequirement: "",
    patientId: "",
    hospitalId: "",
    cartype: "",
    bookingStatus: "",
    paymentStatus: "",
    totalPrice: "",
    driverId: "",
    userAddressId: "",
  });

  // Upload Image
  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    setBooking((prevState) => ({
      ...prevState,
      appointmentImage: image,
    }));
  };

  // get lastest created booking for sent to FindDriver.jsx

  // handleConfirmBookingData
  const handleConfirmBookingData = async () => {
    try {
      setIsLoading(true);
      // ตรวจสอบว่าทุกฟิลด์ที่จำเป็นถูกกรอกหรือไม่
      if (
        !booking.appointmentDate ||
        !booking.patientId ||
        !booking.hospitalId ||
        !booking.cartype ||
        !booking.needWheelChair ||
        !booking.needAssist
      ) {
        Swal.fire({
          title: "Please fill all form!",
          icon: "error",
          confirmButtonText: "Okay",
        });
        return; // **หยุดฟังก์ชันที่นี่ ไม่ให้ดำเนินการต่อ**
      }

      // สร้าง FormData
      const formData = new FormData();
      for (let el in booking) {
        if (el === "hospitalId" || el === "userAddressId") {
          formData.append(el, JSON.stringify(booking[el]));
          continue;
        }
        formData.append(el, booking[el]);
      }

      // บันทึกข้อมูลลง Store

      // เรียก API เพื่อสร้าง booking
      const response = await actionCreateUserBooking(formData);
      console.log(response);
      setUserBooking(response.data);
      console.log(userbooking);
      // **ถ้าทุกอย่างเรียบร้อย ให้เปลี่ยนหน้า**
      setIsLoading(false);
      navigate("/user/booking/finddriver");
    } catch (error) {
      console.log(error);
    }
  };

  // Appointment Date
  const handleDateChange = (e) => {
    const currentDate = new Date();
    const selectedDate = new Date(e);
    if (selectedDate < currentDate) {
      Swal.fire({
        title: "Please select a future date!",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
    setBooking((prevState) => ({
      ...prevState,
      appointmentDate: selectedDate.toLocaleDateString("en-CA"),
    }));
  };

  //Select Patient
  const handlePatientChange = (newPatient) => {
    setBooking((prevState) => ({
      ...prevState,
      patientId: newPatient,
    }));
  };

  //Select UserAddress
  const handleUserAddressChange = (newUserAddress) => {
    setBooking((prevState) => ({
      ...prevState,
      userAddressId: newUserAddress,
    }));
  };

  // Select Hospital
  const handleHospitalChange = (newHospital) => {
    setBooking((prevState) => ({
      ...prevState,
      hospitalId: newHospital,
    }));
  };
  //Select CarType
  const handleCarTypeChange = (newCarType) => {
    setBooking((prevState) => ({
      ...prevState,
      cartype: newCarType,
    }));
  };

  // Select Assits
  const handleAssistanceChange = (newAssistance) => {
    setBooking((prevState) => ({
      ...prevState,
      needAssist: newAssistance,
    }));
  };
  // Select Wheelchair
  const handleWheelchairChange = (newWheelChair) => {
    setBooking((prevState) => ({
      ...prevState,
      needWheelChair: newWheelChair,
    }));
  };

  //loop
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center w-full place-items-center pb-15 bg-cyan-600 ">
      {/* progess */}
      <div className="flex gap-5 w-full text-white place-items-center justify-center mt-10">
        <CircleCheckBig size={48} color="#ffff" />
        <div className=" w-20 h-1 bg-white"></div>
        <CircleDashed size={32} />
        <div className=" w-20 h-1 bg-white"></div>
        <CircleDashed size={32} />
      </div>

      <div className=" rounded-2xl shadow-2xl w-100 bg-white flex flex-col place-items-center pb-20 mt-10 p-5 gap-5 ">
        {/* Make Booking Title */}
        <div className="text-3xl pt-5 pb-5 font-semibold text-cyan-600">
          New Booking
        </div>
        {/* Calendar */}
        <Calendar
          className=" e-calendar text-cyan-600"
          onChange={handleDateChange}
        />

        <div className="w-full gap-5 flex flex-col text-xl">
          {/* select patient */}
          <label className="text-cyan-600 font-semibold">Select Patient</label>
          <SelectPatient handlePatientChange={handlePatientChange} />
          {/* select user address */}
          <label className="text-cyan-600 font-semibold">
            Select Pick up Address
          </label>
          <SelectUserAddress
            handleUserAddressChange={handleUserAddressChange}
          />
          {/* select hospital */}
          <label className="text-cyan-600 font-semibold">
            Select Drop off Hospital
          </label>
          <SelectHospital handleHospitalChange={handleHospitalChange} />
          {/* Select CarType */}
          <label className="text-cyan-600 font-semibold">Select Car Type</label>
          <SelectCarType handleCarTypeChange={handleCarTypeChange} />
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          {/* Need Wheelchair */}
          <SelectWheelChair handleWheelchairChange={handleWheelchairChange} />
          {/* Need Assistance */}
          <SelectAssistance handleAssistanceChange={handleAssistanceChange} />
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
          </label>
        </div>
        {/* Special Requirement */}
        <div className="flex flex-col text-xl gap-2 w-full text-cyan-600 font-semibold">
          <label>
            Special Requirement{" "}
            <span className="text-rose-200 text-3xl">*</span>
          </label>
          <input
            type="text"
            placeholder="Special Requirement"
            className="border-2 border-gray-300 p-2 rounded-md  h-50 text-slate-400"
          />
        </div>
      </div>
      {/* button */}
      <button
        className="bg-cyan-700 w-80 text-xl text-slate-300 p-2 rounded-md mt-10 h-[64px] shadow-2xl"
        onClick={handleConfirmBookingData}
      >
        Create Booking
      </button>
      {isLoading && (
        <div className="w-full h-full absolute pt-20 pb-20">
        <div className="flex flex-col  h-full rounded-lg place-items-center shadow-2xl  bg-white gap-10 pt-20">
          <div className="absolute top-30 z-20 text-center flex flex-col gap-5 place-items-center ">
            <div className="text-4xl font-bold top-40 text-cyan-700 mt-20">
              Busi <span className="italic text-5xl ">Mate</span>
            </div>
            <img src={elder02} className="w-40" alt="" />
          <div className="text-4xl text-cyan-600">Loading...</div>
          

          {/* loop */}
          <div className="flex flex-col justify-center items-center">
            <Swiper
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 100 }}
              className="w-40 h-40"
            >
              {[...Array(10)].map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center items-center w-full h-full">
                    <div className="relative w-30 h-30">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="lightgray"
                          strokeWidth="10"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="cyan"
                          strokeWidth="10"
                          fill="none"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 - (progress / 100) * 251.2}
                          strokeLinecap="round"
                          transition="stroke-dashoffset 0.5s ease-in-out"
                        />
                      </svg>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          </div>
          <div></div>
        </div>
      </div>
)}
      
    </div>
  );
}

export default CreateBooking;
