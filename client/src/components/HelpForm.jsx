import React, { useState } from 'react';

const HelpForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Simulate sending message
    alert('Message sent successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md text-black">
        <h2 className="text-xl font-bold mb-4">Contact Help</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="block mb-1 font-semibold" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-black"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-3">
            <label className="block mb-1 font-semibold" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-black"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-3">
            <label className="block mb-1 font-semibold" htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-black"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
          </div>
          <div className="mb-3">
            <label className="block mb-1 font-semibold" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-black"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HelpForm;
