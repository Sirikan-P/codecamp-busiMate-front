import { React, useState, useEffect } from "react";
import { Car, MapPin, Shield, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import busiMate from "../assets/busimatelogo.png";
import homeImg from "../assets/homeImg.jpg";
import Elder01 from "../assets/Elder01.jpg";
import Elder02 from "../assets/Elder02.jpg";
import Elder03 from "../assets/Elder03.jpg";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);
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
      setCurrentBoxIndex((prevIndex) => (prevIndex + 1) % boxData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const boxVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8 } },
  };

  const actionLinktoLogin = () => navigate("/user/login");
  const actionLinktoDriverRegister = () => navigate("/driver/register");

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Hero Section with Full-Size Background Image */}
      <div className="relative w-full h-[50vh] md:h-screen overflow-hidden">
        <img
          src={homeImg}
          alt="Home Background"
          className="w-full h-full object-cover"
        />
        {/* Animated Feature Box */}
        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
          <motion.div
            className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-cyan-600 flex flex-col gap-2"
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            key={currentBoxIndex}
            transition={{ duration: 1 }}
          >
            {boxData[currentBoxIndex].icon}
            <h3 className="font-semibold text-lg md:text-xl">
              {boxData[currentBoxIndex].title}
            </h3>
            <p className="text-xs md:text-sm">
              {boxData[currentBoxIndex].text}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="flex flex-col items-center gap-8 p-6 md:p-10 bg-cyan-600 text-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl md:text-3xl font-bold text-cyan-200">
            Too busy to take your loved ones to the Hospital?
          </h2>
          <p className="text-slate-200 text-xs md:text-base max-w-lg">
            Join thousands of users who trust Busimate for their transportation
            needs.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={actionLinktoLogin}
            className="bg-cyan-700 text-white px-10 py-3 md:px-20 rounded-full hover:bg-blue-600 transition-colors flex items-center text-sm md:text-base"
          >
            Get Started
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <span className="text-slate-300 text-xs md:text-sm">
              Want to Become Our Drivers?
            </span>
            <button
              onClick={actionLinktoDriverRegister}
              className="text-rose-300 text-xs md:text-sm hover:underline"
            >
              Click Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;