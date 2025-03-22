import { CircleCheckBig, CircleDashed, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import Handle1 from "../../../assets/handle1.jpg";
import Handle2 from "../../../assets/handle2.jpg";
import Handle4 from "../../../assets/handle4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router";

import io from "socket.io-client";
import useUserBookingStore from "../../../store/booking-store";
import { actionFindNewDriver, actionNewdriver } from "../../../api/userBooking";

const socket = io("http://localhost:8877", {});

function HandleBookingResponse() {
  const [progress, setProgress] = useState(0);
  const bookingData = useUserBookingStore((state) => state.bookingwithId);
  const [searchnewdriver, setSearchnewdriver] = useState({
     id: "",
     driverId: "",
 
   })

   
  const bookingId = bookingData.id; 

  // noti
  const [socketResult, setSocketResult] = useState({});
  const navigate = useNavigate();
  const hdlAccept = () => {
    socket.off(bookingId);
    navigate(`/user/checkout/${bookingId}`);
    console.log("hello see you");      
  };

  const hdlReject = async () => {
    socket.off(bookingId);
    hdlFindNewDriver()
    hdUpdateDriver()
    // navigate("/user/booking/findNewdriver");
  };


const hdlFindNewDriver = async () =>{
  try {
    const newSelectDriver = await actionFindNewDriver(bookingData)
     console.log(newSelectDriver.data.id);
     const bookingId = bookingData.id
     console.log(bookingId);
     setSearchnewdriver({ driverId: newSelectDriver.data.id, id: bookingId})
     console.log(searchnewdriver);

  } catch (error) {
    console.log(error);
  }
}

const hdUpdateDriver = async () => {
  try {
       // updateDriverAddressBookingWithNewDriverId
       console.log("object");
       console.log(bookingData);
       const updateNewDriver = await actionNewdriver(searchnewdriver)
       console.log(updateNewDriver,"updateNewDriver");
  }
catch (error) {
    console.log(error);
  }
}





  useEffect(() => {
    socket.on(bookingId, (data) => {
      console.log("effectat user", data);
      setSocketResult(data);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Booking data updated:", bookingData);
  }, [bookingData]);  // เมื่อ bookingData เปลี่ยนแปลง จะ log ค่าใหม่

  // find new driver
  // const hdlFindNewDriver = async () => {
  //   const response = await actionFindNewDriver(bookingId);
  //   console.log(response);}

  return (
    <div className="flex flex-col place-items-center bg-cyan-600 h-screen pt-5 pr-5 pl-5 ">
      {/* progess */}
      <div className="flex gap-5 w-full text-white place-items-center justify-center m-5 ">
        <CircleDashed size={32} />
        <div className=" w-20 h-1 bg-white"></div>
        <CircleDashed size={32} />
        <div className=" w-20 h-1 bg-white"></div>
        <CircleCheckBig size={48} color="#ffff" />
      </div>
      <div className="flex flex-col w-full h-screen rounded-lg place-items-center bg-white m-5 p-10 gap-10">
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
        {/* text */}
        <div>
        <p> this booking is created ,please wait for driver action.... </p>
        <p>
        <button onClick={hdlReject} className="btn">
              {" "}
              Find New Driver{" "}
            </button>
             {/* btn checkout */}
          {" "}
          {socketResult == "ACCEPT" && (
            <button onClick={hdlAccept} className="btn bg-cyan-700 w-60 mb-5 p-5 h-10 text-2xl rounded-md text-white">
              {" "}
              Pay Now{" "}
            </button>
          )}{" "}
        </p>
        <p>
          {" "}
          {socketResult == "REJECT" && (
            <button onClick={hdlReject} className="btn"
            
            >
              {" "}
              Find New Driver{" "}
            </button>
          )}{" "}
        </p>
        </div>

  
      </div>
    </div>
  );
}

export default HandleBookingResponse;
