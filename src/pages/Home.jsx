import {React, useState, useEffect} from "react";
import { Car, MapPin, Shield, Clock, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import busiMate from "../assets/busimatelogo.png";
import homeImg from "../assets/homeImg.jpg";
import Elder01 from "../assets/Elder01.jpg";
import Elder02 from "../assets/Elder02.jpg";
import Elder03 from "../assets/Elder03.jpg";
import { motion } from  "framer-motion";



function Home() {
  const navigate = useNavigate();
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0); // เก็บหมายเลขกล่องที่จะแสดง
  const boxData = [
    { icon: <Car className="w-10 h-10" />, title: "Pre-Booking Service with Various Options", text: "The website allows users to book a ride in advance, ensuring that transportation is ready when needed. It also offers a variety of services tailored to customer needs." },
    { icon: <MapPin className="w-10 h-10" />, title: "Flexible Destination and Nearby Driver Search", text: "Users can set a pin for any hospital of their choice, and the system will locate the nearest available driver for convenience." },
    { icon: <Shield className="w-10 h-10" />, title: "Safe and Reliable Drivers", text: "The platform ensures the safety of passengers by providing a reliable driver screening process, giving peace of mind to users." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBoxIndex((prevIndex) => (prevIndex + 1) % boxData.length); // เปลี่ยนหมายเลขกล่องไปยังถัดไป และวนลูปเมื่อถึงกล่องสุดท้าย
    }, 3000); // 3 วินาที
    return () => clearInterval(interval); // เคลียร์ interval เมื่อ component ถูก unmount
  }, []);

  const boxVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8 } },
  };


  const actionLinktoLogin = () => {
    navigate("/user/login");
  };

  const actionLinktoDriverRegister = () => {
    navigate("/driver/register");
  };


  return (
    <div className="w-full min-h-screen flex flex-col ">

        {/* <div className="absolute top-0 right-0 bg-gradient-to-r from-white-200 via-white to-white   w-70 h-180 object-cover -z-5"></div> */}
        <img src={homeImg} alt="" className="w-full h-full" />
        
      
            <div className="w-full absolute h-55 overflow-hidden mt-80 flex flex-col gap-10 place-items-center p-5 max-h-screen">
              <div className="w-full shadow-lg p-5 bg-white rounded-lg text-cyan-600 flex-col">
              <Car className="w-10 h-10" />
              <div className="font-semibold">Pre-Booking Service with Various Options</div>
              <span className="text-[12px]">The website allows users to book a ride in advance, ensuring that transportation is ready when needed. It also offers a variety of services tailored to customer needs.</span>
              </div>
              <div className="w-full shadow-lg p-5 bg-white rounded-lg text-cyan-600 flex-col">
              <MapPin className="w-10 h-10" />
              <div className="font-semibold">Flexible Destination and Nearby Driver Search</div>
              <span className="text-[12px]">Users can set a pin for any hospital of their choice, and the system will locate the nearest available driver for convenience.</span>
              </div>
              <div className="w-full shadow-lg p-5 bg-white rounded-lg text-cyan-600 flex-col">
              <Shield className="w-10 h-10" />
              <div className="font-semibold">Safe and Reliable Drivers</div>
              <span className="text-[12px]">The platform ensures the safety of passengers by providing a reliable driver screening process, giving peace of mind to users.</span>
              </div>
          
             
            </div>

            {/* Section with Animated Boxes */}
            <div className="w-full absolute h-55 overflow-hidden mt-80 flex flex-col gap-10 place-items-center p-5 max-h-screen">
        <motion.div
          className="w-full shadow-lg p-5 bg-white rounded-lg text-cyan-600 flex-col"
          variants={boxVariants}
          initial="hidden"
          animate="visible"
          key={currentBoxIndex} // การใช้ key จะทำให้ React แสดงกล่องใหม่เมื่อหมายเลขกล่องเปลี่ยน
          transition={{ duration: 1 }}
        >
          {boxData[currentBoxIndex].icon}
          <div className="font-semibold">{boxData[currentBoxIndex].title}</div>
          <span className="text-[12px]">{boxData[currentBoxIndex].text}</span>
        </motion.div>
      </div>

      
    

      <div className="flex flex-col gap-10 place-items-center text-center p-10 pt-30 h-[470px] bg-cyan-600 max-h-screen">
          <div className=" flex flex-col items-center gap-5 ">
            <h2 className="text-2xl font-bold text-cyan-200 ">
              Too busy to take your loved ones to the Hospital?
            </h2>
            <p className="text-slate-200  text-[12px]">
              Join thousands of user that trust Busimate for their
              transportation needs.
            </p>
          </div>

          
        
          {/* text and become ours driver btn */}
        <div className="">
          <div className=" flex flex-col items-center">
            {/* get started btn */}
            <div className="mb-5">
              <button
                onClick={actionLinktoLogin}
                className="bg-cyan-700 text-white px-20 py-3 rounded-full hover:bg-blue-600 transition-colors flex items-center"
              >
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            {/* become our driver btn */}
            <div className="flex  justify-center items-center gap-2">
              <div className="text-[14px] text-slate-300">Want to Become Our Drivers?</div>
              <div
                onClick={actionLinktoDriverRegister}
                className=" text-rose-300 text-[12px] "
              >
                Click Here
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
   
  );
}

export default Home;

{
  /* <div className="w-70 border-1 border-slate-300 rounded-sm overflow-hidden"> */
}
{
  /* <div className="absolute top-0 right-0 bg-gradient-to-r from-white-200 via-white to-white   w-70 h-180 object-cover -z-5"></div> */
}
{
  /* <img
  src={homeImg}
  alt=""
  className=""
/> */
}
// </div>
