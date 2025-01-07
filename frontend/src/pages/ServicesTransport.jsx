import React from "react";
import { Link } from "react-router-dom";

const ServicesPageLogistics = () => {
  return (
    <div className="font-sans antialiased bg-gray-50 min-h-screen">
      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">Our Logistics Services</h2>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg transition-transform transform">
            <p className="text-lg leading-relaxed mb-4 text-gray-800">
              At HarvestConnect, we offer a range of logistics services designed to streamline the transportation and distribution of agricultural products. Our comprehensive suite of services includes:
            </p>
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Transportation Management</h3>
            <p className="text-lg leading-relaxed mb-4 text-gray-800">
              Our Transportation Management service allows you to efficiently plan, execute, and optimize the movement of goods. Track shipments in real-time and ensure timely delivery.
            </p>
            <h3 className="text-2xl font-bold mb-4  text-blue-400">Order Fulfillment</h3>
            <p className="text-lg leading-relaxed mb-4 text-gray-800">
              Streamline order processing and fulfillment to ensure that customers receive their products on time. Manage orders efficiently from placement to delivery.
            </p>
            <h3 className="text-2xl font-bold mb-4  text-blue-400">Warehouse Management</h3>
            <p className="text-lg leading-relaxed mb-4 text-gray-800">
              Optimize warehouse operations with our Warehouse Management service. Manage storage, pick-and-pack operations, and ensure efficient space utilization.
            </p>
            <h3 className="text-2xl font-bold mb-4  text-blue-400">Customization</h3>
            <p className="text-lg leading-relaxed mb-4 text-gray-800">
              Customize your logistics experience with various settings options. Tailor our services to meet your specific needs and preferences.
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

export default ServicesPageLogistics;
