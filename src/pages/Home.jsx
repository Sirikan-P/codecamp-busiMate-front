import { React, useState, useEffect } from "react";
import { Car, MapPin, Shield, Clock, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import busiMate from "../assets/busimatelogo.png";
import homeImg from "../assets/homeImg.jpg";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Home() {
  const navigate = useNavigate();
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0); // เก็บหมายเลขกล่องที่จะแสดง

  const boxData = [
    {
      icon: <Car className="w-10 h-10" />,
      title: "Pre-Booking Service with Various Options",
      text: "The website allows users to book a ride in advance, ensuring that transportation is ready when needed. It also offers a variety of services tailored to customer needs.",
    },
    {
      icon: <MapPin className="w-10 h-10" />,
      title: "Flexible Destination and Nearby Driver Search",
      text: "Users can set a pin for any hospital of their choice, and the system will locate the nearest available driver for convenience.",
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Safe and Reliable Drivers",
      text: "The platform ensures the safety of passengers by providing a reliable driver screening process, giving peace of mind to users.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBoxIndex((prevIndex) => (prevIndex + 1) % boxData.length); // เปลี่ยนหมายเลขกล่องไปยังถัดไป และวนลูปเมื่อถึงกล่องสุดท้าย
    }, 3000); // 3 วินาที
    return () => clearInterval(interval); // เคลียร์ interval เมื่อ component ถูก unmount
  }, []);


  const actionLinktoLogin = () => {
    navigate("/user/login");
  };

  const actionLinktoDriverRegister = () => {
    navigate("/driver/register");
  };

  return (
    <div className="w-full min-h-screen relative">
      {/* Background Image */}
      <img src={homeImg} alt="" className="w-full h-full object-cover " />

      {/* Swiper บนสุด */}
      <div className="absolute top-100 left-1/2 transform -translate-x-1/2 z-20 w-[90%] max-w-lg">
        <Swiper
          spaceBetween={5}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          // pagination={{ clickable: true }}
          // navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full"
        >
          {boxData.map((box, index) => (
            <SwiperSlide key={index}>
              <div className="shadow-lg p-5 bg-white rounded-lg text-cyan-600 flex flex-col items-start ">
                {box.icon}
                <div className="font-semibold mt-2">{box.title}</div>
                <span className="text-[12px]">{box.text}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content ด้านล่าง Swiper */}
      <div className="flex flex-col gap-10 items-center text-center p-10 pt-30 h-[470px] bg-cyan-600">
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-2xl font-bold text-cyan-200">
            Too busy to take your loved ones to the Hospital?
          </h2>
          <p className="text-slate-200 text-[12px]">
            Join thousands of users who trust Busimate for their transportation needs.
          </p>
        </div>

        {/* Buttons */}
        <div>
          <button
            onClick={() => navigate("/user/login")}
            className="bg-cyan-700 text-white px-20 py-3 rounded-full  flex items-center"
          >
            Get Started
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>

          <div className="flex justify-center items-center gap-2 mt-5">
            <span className="text-[14px] text-slate-300">
             Driver Login
            </span>
            <span
              onClick={() => navigate("/driver/login")}
              className="text-rose-300 text-[12px] cursor-pointer"
            >
              Click Here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
