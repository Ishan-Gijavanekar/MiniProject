import React, { useState } from 'react';


const ContactUs = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "21379e78-18e8-4cc5-a426-e86dec10a43f");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
          console.log("Success", res);
          alert("We will get back to you Shortly")
        }
      };

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-gray-100 p-6">
                <div className="container mx-auto flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 p-4">
                        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center md:text-left">Contact Us</h1>
                        {submitted ? (
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl text-green-600">Thank you for your message!</h2>
                                <p>We will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                                    Submit
                                </button>
                            </form>
                        )}
                    </div>
                    <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-lg mt-8 md:mt-0 hover:shadow-xl transition-shadow duration-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
                        <p className="text-gray-600 mb-4">Feel free to reach out to us through any of the following contacts:</p>
                        <ul className="text-gray-600 space-y-4">
                            <li className="flex items-center space-x-3">
                                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l-4-4m0 0l-4 4m4-4v12"></path>
                                </svg>
                                <span>
                                    <strong>Email:</strong> isg.sachin@gmail.com
                                </span>
                            </li>
                        <li className="flex items-center space-x-3">
                            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h2a3 3 0 013 3v2a3 3 0 01-3 3H3m0-8h2a3 3 0 013-3m0 8v2a3 3 0 013 3h8a3 3 0 003-3V8a3 3 0 00-3-3h-2M5 10a3 3 0 003 3m10-3v2a3 3 0 013 3m0 2a3 3 0 01-3 3"></path>
                            </svg>
                            <span>
                                <strong>Phone:</strong> (+91) 8830368951
                            </span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            <span>
                                <strong>Branch office:</strong> Flat No. 008, Safalya Homes, 3 <super>rd</super> Cross, Dwarka Nagar, Mandoli Road, Tilakwadi, Belagavi-590006
                            </span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zm0 0v1c0 2.21 1.79 4 4 4s4-1.79 4-4v-1m0-2v-3a3 3 0 00-3-3h-6a3 3 0 00-3 3v3"></path>
                            </svg>
                            <span>
                                <strong>Resource Person:</strong> Ishan Gijavanekar
                            </span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zm0 0v1c0 2.21 1.79 4 4 4s4-1.79 4-4v-1m0-2v-3a3 3 0 00-3-3h-6a3 3 0 00-3 3v3"></path>
                            </svg>
                            <span>
                                <strong>Resource Person:</strong> Gururaj Kurbet
                            </span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zm0 0v1c0 2.21 1.79 4 4 4s4-1.79 4-4v-1m0-2v-3a3 3 0 00-3-3h-6a3 3 0 00-3 3v3"></path>
                            </svg>
                            <span>
                                <strong>Resource Person:</strong> Atharv Kulkarni
                            </span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zm0 0v1c0 2.21 1.79 4 4 4s4-1.79 4-4v-1m0-2v-3a3 3 0 00-3-3h-6a3 3 0 00-3 3v3"></path>
                            </svg>
                            <span>
                                <strong>Resource Person:</strong> Harsh Anvekar
                            </span>
                        </li>
                    </ul>
                </div>
                </div>
            </main>
        </div>
    );
};

export default ContactUs;