import React from "react";
import { Car, MapPin, Shield, Clock, Star, ChevronRight } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">Busimate</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Services
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Contact
            </a>
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-800 leading-tight mb-6">
              Your Business Travel Made Simple
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with reliable business transportation services. Safe,
              punctual, and professional.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors flex items-center">
                Book Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:border-blue-500 hover:text-blue-500 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800"
              alt="Business car service"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Busimate
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Shield className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">
                Vetted drivers and secure payment systems for your peace of
                mind.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Clock className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Always On Time</h3>
              <p className="text-gray-600">
                Punctual service with real-time tracking and updates.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Star className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Service</h3>
              <p className="text-gray-600">
                Professional drivers and luxury vehicles for your comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-blue-500 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business Travel?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Busimate for their
            transportation needs.
          </p>
          <button className="bg-white text-blue-500 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors">
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Car className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold text-gray-800">Busimate</span>
            </div>
            <p className="text-gray-600">
              © 2024 Busimate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
