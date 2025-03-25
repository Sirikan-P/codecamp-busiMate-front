import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { actionCheckOutStatus } from "../../../api/payment";
import { createAlert } from "../../../utils/createAlert";
import { Swiper, SwiperSlide } from "swiper/react";
import { CircleCheckBig, CircleDashed, Loader } from "lucide-react";
import LandingPic from "../../../assets/LandingPic.png";

function CheckoutComplete() {
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const { session } = useParams();

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const checkSession = async () => {
    if (!session) return;

    try {
      console.log(session);
      const res = await actionCheckOutStatus(token, session);
      createAlert("success", res.data.message || "Payment Successfully");
    } catch (error) {
      createAlert("error", "failed to verify payment");
      console.error("Payment verify error:", error);
    }
  };
  return (
    <div className="flex flex-col place-items-center bg-cyan-600 h-screen pt-5 pr-5 pl-5 ">
      <div className="flex flex-col w-full h-screen rounded-lg place-items-center bg-white m-5 p-10 gap-10">
        <div>
          <div className=" flex flex-col place-items-center gap-20 ">
            {/* text */}
            <div className="font-semibold text-cyan-700 mb-10 text-4xl">
              {" "}
              "Payment successful! "{" "}
            </div>
            <div>
              <img src={LandingPic} alt="" />
            </div>
            <div className="text-cyan-600 mb-5 text-xl">
              Thank you for booking with us Our team is preparing your trip.
          
            
            </div>
            <div>
              {/* btn checkout */}

              {/* )}{" "}  */}
            </div>
          </div>
          <di className="flex flex-col place-items-center gap-20 ">
            <button className="btn bg-cyan-700 w-60 mb-5 p-5 h-10 text-xl rounded-md text-white "
            onClick={() => navigate("/user/booking")}
            >
              My Booking
            </button>
          </di>
        </div>
      </div>
    </div>
  );
}

export default CheckoutComplete;
