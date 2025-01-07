import React from "react";
import { Link } from "react-router-dom";

const AboutPageTransport = () => {
  return (
    <div className="font-sans antialiased bg-gray-50 min-h-screen">
      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-500">About HarvestConnect</h2>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg transition-transform transform">
            <p className="text-lg leading-relaxed mb-4 text-gray-800">
              Welcome to HarvestConnect, your trusted partner in modern transport management. Our platform is designed to streamline and enhance the way transport providers manage their fleets, bookings, and overall operations. With a user-friendly interface and a suite of powerful tools, HarvestConnect empowers providers to make data-driven decisions, optimize resources, and maximize efficiency.
            </p>
            <h3 className="text-2xl font-bold mb-4 text-blue-500">Our Mission</h3>
            <p className="text-lg leading-relaxed mb-4 text-gray-800">
              At HarvestConnect, our mission is to revolutionize transport management through technology. We aim to provide providers with the tools they need to efficiently manage their fleets, monitor booking history, and ensure sustainable practices. By leveraging the latest advancements in transport technology, we strive to help providers achieve higher productivity and profitability.
            </p>
            <h3 className="text-2xl font-bold mb-4 text-blue-500">Features</h3>
            <ul className="list-disc list-inside text-lg text-gray-800 pl-6">
              <li className="mb-2"><strong>Booking Monitoring:</strong> Keep track of all bookings, from initial reservation to completion. Monitor booking history and receive timely updates.</li>
              <li className="mb-2"><strong>Status Updates:</strong> Stay informed with real-time updates on fleet status and booking history.</li>
              <li className="mb-2"><strong>Fleet Management:</strong> Present and manage your fleet efficiently.</li>
              <li className="mb-2"><strong>Image Upload:</strong> Upload images to keep a visual record of your vehicles.</li>
              <li className="mb-2"><strong>Settings:</strong> Customize your experience with various settings options.</li>
            </ul>
            <h3 className="text-2xl font-bold mb-4 text-blue-500">Why Choose HarvestConnect?</h3>
            <ul className="list-disc list-inside text-lg text-gray-800 pl-6">
              <li className="mb-2"><strong>User-Friendly Interface:</strong> Our platform is designed with simplicity in mind, making it easy for providers to navigate and use.</li>
              <li className="mb-2"><strong>Comprehensive Data:</strong> Access detailed information about your fleet and bookings to make informed decisions.</li>
              <li className="mb-2"><strong>Efficiency:</strong> Save time and resources with our streamlined management tools.</li>
              <li className="mb-2"><strong>Support:</strong> Our dedicated support team is always here to help you with any questions or issues.</li>
            </ul>
            <p className="text-lg leading-relaxed text-gray-800 mt-4">
              Join HarvestConnect today and take the first step towards smarter, more efficient transport management.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-xl font-bold mb-4">HarvestConnect</h5>
              <p>Your partner in assured transport management.</p>
            </div>
            <div>
              <h5 className="text-xl font-bold mb-4">Navigation</h5>
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="hover:text-gray-300">Home</Link>
                <Link to="/services" className="hover:text-gray-300">Services</Link>
                <Link to="/about" className="hover:text-gray-300">About</Link>
                <Link to="/contact" className="hover:text-gray-300">Contact</Link>
              </nav>
            </div>
            <div>
              <h5 className="text-xl font-bold mb-4">Contact Us</h5>
              <p className="mb-2">Email: info@HarvestConnect.com</p>
              <p>Phone: 8830368951</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPageTransport;
