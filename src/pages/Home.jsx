import React from "react";
import { Car, MapPin, Shield, Clock, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import busiMate from "../assets/busimatelogo.png";

function Home() {
  const navigate = useNavigate();

  const actionLinktoLogin = () => {
    navigate("/login");
  };

  const actionLinktoDriverRegister = () => {
    navigate("/registerdriver");
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
{/* login btn */}
              <button onClick={actionLinktoLogin} className="border-2 border-pink-200 text-pink-800 px-8 py-3 rounded-full hover:bg-blue-600 transition-colors flex items-center">
                Log in
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
      </div>


      {/* Features Section */}
      {/* <section className="bg-cyan-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-cyan-600 mb-12">
            Why Choose Busimate
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white  rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Shield className="h-12 w-12 text-pink-800 mb-4" />
              <h3 className="text-xl text-cyan-500 font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">
                Vetted drivers and secure payment systems for your peace of
                mind.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Clock className="h-12 w-12 text-pink-800 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-cyan-500">Always On Time</h3>
              <p className="text-gray-600">
                Punctual service with real-time tracking and updates.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Star className="h-12 w-12 text-pink-800 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-cyan-500">Premium Service</h3>
              <p className="text-gray-600">
                Professional drivers and luxury vehicles for your comfort.
              </p>
            </div>
          </div>
        </div>
      </section> */}

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
