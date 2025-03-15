import React from "react";
import { Car, MapPin, Shield, Clock, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import busiMate from "../assets/busimatelogo.png";

function Home() {
  const navigate = useNavigate();

  const actionLinktoLogin = () => {
    navigate("/user/login");
  };

  const actionLinktoDriverRegister = () => {
    navigate("/driver/register");
  };

  return (
    <div className="min-h-screen ">
      <div className="bg-gradient-to-b from-cyan-100 to-white w-full absolute -z-10"></div>
      {/* Hero Section */}
      <div className="flex flex-col place-items-center pt-10">
{/* logo */}
          <div className="w-[300px] ">
            <img
              src={busiMate}
              alt="Business car service"
              className=""
            />
          </div>
{/* get started btn */}
            <div className="flex space-x-4 justify-center ">
              {/* Book now Link to loginn page */}
              <button onClick={actionLinktoLogin} className="bg-cyan-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors flex items-center">
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>

            </div>
      </div>

      {/* CTA Section */}
      <section className="container mx-auto p-10">
        <div className="bg-cyan-500 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business Travel?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Busimate for their
            transportation needs.
          </p>
          <button onClick={actionLinktoDriverRegister} className="bg-white text-pink-800 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors">
            Become Our Drivers
          </button>
        </div>
      </section>

    
    </div>
  );
}

export default Home;
