import React, { useState } from 'react';
import { Mail, Phone, MapPin, User } from 'lucide-react';

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
          setSubmitted(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        Contact Us
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        We'd love to hear from you. Please fill out this form or use our contact information.
                    </p>
                </div>

                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-2 md:gap-6">
                        <div className="mt-5 md:mt-0 md:col-span-1">
                            <div className="bg-white shadow-2xl overflow-hidden sm:rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Contact Information</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-center space-x-3 text-gray-700">
                                            <Mail className="h-6 w-6 text-indigo-600" />
                                            <span><strong>Email:</strong> isg.sachin@gmail.com</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-700">
                                            <Phone className="h-6 w-6 text-green-600" />
                                            <span><strong>Phone:</strong> (+91) 8830368951</span>
                                        </div>
                                        <div className="flex items-start space-x-3 text-gray-700">
                                            <MapPin className="h-6 w-6 text-red-600 mt-1" />
                                            <span>
                                                <strong>Branch office:</strong> Flat No. 008, Safalya Homes, 3<sup>rd</sup> Cross, Dwarka Nagar, Mandoli Road, Tilakwadi, Belagavi-590006
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 mt-8 mb-4">Resource Persons</h3>
                                    <div className="space-y-4">
                                        {['Ishan Gijavanekar', 'Gururaj Kurbet', 'Atharv Kulkarni', 'Harsh Anvekar'].map((person, index) => (
                                            <div key={index} className="flex items-center space-x-3 text-gray-700">
                                                <User className="h-5 w-5 text-indigo-600" />
                                                <span>{person}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-1">
                            <div className="bg-white shadow-2xl sm:rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                                <div className="px-4 py-5 sm:p-6">
                                    {submitted ? (
                                        <div className="text-center">
                                            <h2 className="text-2xl font-semibold text-green-600 mb-2">Thank you for your message!</h2>
                                            <p className="text-gray-600">We will get back to you shortly.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={onSubmit} className="space-y-6">
                                            {['name', 'email', 'phone'].map((field) => (
                                                <div key={field}>
                                                    <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                                                        {field}
                                                    </label>
                                                    <input
                                                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                                                        id={field}
                                                        name={field}
                                                        value={form[field]}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                                        required
                                                    />
                                                </div>
                                            ))}
                                            <div>
                                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                                    Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    rows={4}
                                                    value={form.message}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                                    required
                                                ></textarea>
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-105"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
