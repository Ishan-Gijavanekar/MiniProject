import React, { useState } from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="font-sans antialiased">
      {/* Header */}
      <header className="bg-blue-900 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-bold">FarmConnect</div>
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
            <Link to="/login" className="px-4 py-2 bg-white text-blue-900 rounded hover:bg-gray-200">
              Login
           </Link>
          </nav>
          <button
            className="md:hidden text-white hover:text-gray-300"
            onClick={toggleNavbar}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Navbar */}
      {isOpen && (
        <nav className="md:hidden bg-blue-900 text-white flex flex-col items-center space-y-4 py-4">
          <a href="#home" onClick={toggleNavbar}>
            Home
          </a>
          <a href="#features" onClick={toggleNavbar}>
            Features
          </a>
          <a href="#testimonials" onClick={toggleNavbar}>
            Testimonials
          </a>
          <a href="#contact" onClick={toggleNavbar}>
            Contact
          </a>
          <button
            className="px-4 py-2 bg-white text-blue-900 rounded hover:bg-gray-200 transititon-all"
            onClick={toggleNavbar}
          >
            Login
          </button>
        </nav>
      )}

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-screen text-white flex items-center"
        style={{ backgroundImage: 'url("background1.jpg")' }}
      >
        <div className="container mx-auto px-4 text-center pt-16">
          <h1 className="text-5xl font-bold mb-4">Welcome to Connect</h1>
          <p className="text-lg mb-8">
            Your partner in assured contract farming. Connect with potential
            buyers, manage contracts seamlessly, and ensure timely payments.
          </p>
          <Link to={"/login"} className="px-6 py-3 bg-blue-700 rounded text-white text-lg hover:bg-blue-800">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">Contract Management</h3>
              <p>
                Streamline your contract management process with our easy-to-use
                tools.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">Price Negotiation</h3>
              <p>
                Negotiate the best prices for your produce directly with buyers.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">Secure Payments</h3>
              <p>Ensure timely and secure payments for your crops.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 text-center">
              <blockquote className="italic">
                "FarmConnect has transformed the way we do business. We now have
                guaranteed buyers for our produce."
              </blockquote>
              <footer className="mt-4">- Farmer John</footer>
            </div>
            <div className="p-6 text-center">
              <blockquote className="italic">
                "The contract management tools are intuitive and have saved us a
                lot of time."
              </blockquote>
              <footer className="mt-4">- Buyer Sarah</footer>
            </div>
            <div className="p-6 text-center">
              <blockquote className="italic">
                "We’ve never had to worry about timely payments since using
                FarmConnect."
              </blockquote>
              <footer className="mt-4">- Vendor Mike</footer>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-xl font-bold">FarmConnect</h5>
              <p>Your partner in assured contract farming.</p>
            </div>
            <div>
              <h5 className="text-xl font-bold">Navigation</h5>
              <nav className="flex flex-col">
                <a href="#home" className="mt-2">
                  Home
                </a>
                <a href="#features" className="mt-2">
                  Features
                </a>
                <a href="#testimonials" className="mt-2">
                  Testimonials
                </a>
                <a href="#contact" className="mt-2">
                  Contact
                </a>
              </nav>
            </div>
            <div>
              <h5 className="text-xl font-bold">Contact Us</h5>
              <p className="mt-2">Email: info@farmconnect.com</p>
              <p className="mt-2">Phone: +1 234 567 890</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;