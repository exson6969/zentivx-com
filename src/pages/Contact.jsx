import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { collection, addDoc } from "firebase/firestore";
import db from '../firebase';



const initialFormData = {
  name: '',
  email: '',
  phone: '',
  message: ''
}

const Contact = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'ContactForm'), { formData })

      setAlert({ type: 'success', message: 'Message sent successfully!' });
      setFormData(initialFormData);
    } catch (error) {
      console.log(error)
      setAlert({ type: 'danger', message: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div className='h-screen flex flex-col md:justify-between  p-6'>
      <div>
        <Header />
      </div>
      <h1 class='font-medium text-2xl text-center my-4 md:text-4xl'>
        Contact Us
      </h1>
      <div class='flex flex-col md:flex-row  md:justify-between items-start md:items-center justify-center px-0 md:px-12 gap-4'>
        <div className="flex flex-col  gap-4 md:w-2/5 w-full">
          <div className="bg-gray-100 px-4 py-8 rounded-md border-2 flex gap-6 items-center">
            <i class="bi bi-telephone text-7xl text-orange-500"></i>
            <div>
              <p className='text-lg font-semibold'>Phone Number</p>
              <p className="text-gray-600 text-2xl">+91 9994908702</p>
            </div>
          </div>

        </div>
        <div class='md:w-1/2 w-full  md:pl-8'>
          <main className='flex w-full md:w-3/4 py-8 bg-white flex-col justify-center md:justify-between items-center '>
            <form onSubmit={handleSubmit} className='w-11/12 md:w-3/4'>
              <div className='grid  gap-2'>
                <div>
                  <label htmlFor="name" className="block font-semibold">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-semibold">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-semibold">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block font-semibold">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <div className={`alert  alert-${alert.type}`} role="alert">
                    {alert.message}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-6 mb-2 md:mb-0 py-2 bg-orange-600 hover:border-orange-600 border-2 hover:text-orange-600 duration-700 hover:bg-white text-white rounded-md"
              >
                Send Message
              </button>
            </form>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;