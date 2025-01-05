import React from "react";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  return (
    <div className="font-sans antialiased bg-gray-50 min-h-screen">
      {/* Header */}
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-700">Our Services</h2>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg transition-transform transform">
            <p className="text-lg leading-relaxed mb-4 text-gray-800">
              At HarvestConnect, we offer a range of services designed to help farmers streamline their agricultural operations and achieve greater productivity. Our comprehensive suite of services includes:
            </p>
            <h3 className="text-2xl font-bold mb-4 text-green-700">Field Management</h3>
            <p className="text-lg leading-relaxed mb-4 text-gray-800">
              Our Field Management service allows you to easily add, update, and delete field information. Get detailed data on field size, irrigation status, and soil type to make informed decisions.
            </p>
            <h3 className="text-2xl font-bold mb-4 text-green-700">Crop Monitoring</h3>
            <p className="text-lg leading-relaxed mb-4 text-gray-800">
              Keep track of your crops from planting to harvest. Monitor growth stages, receive timely updates, and ensure optimal crop health with our Crop Monitoring service.
            </p>
            <h3 className="text-2xl font-bold mb-4 text-green-700">Real-Time Status Updates</h3>
            <p className="text-lg leading-relaxed mb-4 text-gray-800">
              Stay informed with real-time updates on field conditions and crop health. Our service provides accurate and timely information to help you respond quickly to changing conditions.
            </p>
            <h3 className="text-2xl font-bold mb-4 text-green-700">Stock Management</h3>
            <p className="text-lg leading-relaxed mb-4 text-gray-800">
              Present and manage your stock efficiently with our Stock Management service. Keep track of inventory levels and ensure timely availability of resources.
            </p>
            <h3 className="text-2xl font-bold mb-4 text-green-700">Image Upload</h3>
            <p className="text-lg leading-relaxed mb-4 text-gray-800">
              Upload images to keep a visual record of your fields and crops. Our Image Upload service allows you to document and monitor changes over time.
            </p>
            <h3 className="text-2xl font-bold mb-4 text-green-700">Customization</h3>
            <p className="text-lg leading-relaxed mb-4 text-gray-800">
              Customize your experience with various settings options. Tailor our services to meet your specific needs and preferences.
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
              <p>Your partner in assured contract farming.</p>
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
              <p className="mb-2">Email: info@harvestconnect.com</p>
              <p>Phone: 8830368951</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
