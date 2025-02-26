import React from 'react';
import { Search, Award, Clock, Home as HomeIcon } from 'lucide-react';
import { Button } from '../components/ui/button';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find and Compare Lab Tests Near You
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Compare prices, book appointments, and get your tests done from the most trusted labs in your area.
        </p>
        <div className="max-w-md mx-auto bg-white rounded-lg p-2 flex items-center">
          <input
            type="text"
            placeholder="Search for tests (e.g., Blood Sugar, Thyroid Profile)"
            className="flex-1 px-4 py-2 outline-none text-gray-700"
          />
          <Button className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Trusted Labs</h3>
          <p className="text-gray-600">
            All labs are verified and accredited for quality assurance
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quick Results</h3>
          <p className="text-gray-600">
            Get your test results quickly and securely online
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <HomeIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Home Collection</h3>
          <p className="text-gray-600">
            Convenient home sample collection at your preferred time
          </p>
        </div>
      </section>

      {/* Popular Tests Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Health Packages</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Complete Health Checkup",
              tests: "70+ Parameters",
              price: "₹1,999",
              image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&q=80&w=400"
            },
            {
              name: "Diabetes Screening",
              tests: "15+ Parameters",
              price: "₹799",
              image: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=400"
            },
            {
              name: "Thyroid Profile",
              tests: "3 Parameters",
              price: "₹599",
              image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=400"
            }
          ].map((package_, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <img
                src={package_.image}
                alt={package_.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{package_.name}</h3>
                <p className="text-gray-600 mb-4">Includes {package_.tests}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">{package_.price}</span>
                  <Button>Book Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;