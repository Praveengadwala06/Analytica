import React, { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Alert = ({ type, title, description, onClose }) => {
  // Define styles and icons based on alert type
  const baseStyle = "flex items-start p-4 mb-4 rounded shadow relative";
  const iconStyle = "flex-shrink-0 w-6 h-6 mr-3 mt-1";

  const alertTypes = {
    basic: {
      bg: "bg-gray-300",
      icon: (
        <svg
          className={iconStyle}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
        </svg>
      ),
    },
    success: {
      bg: "bg-green-300",
      icon: (
        <svg
          className={iconStyle}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    info: {
      bg: "bg-blue-300",
      icon: (
        <svg
          className={iconStyle}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="8" x2="12.01" y2="8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    error: {
      bg: "bg-red-300",
      icon: (
        <svg
          className={iconStyle}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    warning: {
      bg: "bg-yellow-200",
      icon: (
        <svg
          className={iconStyle}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      ),
    },
  };

  const closeIcon = (
    <button
      type="button"
      className="absolute top-2 right-2 text-current hover:text-gray-700"
      aria-label="Close alert"
      onClick={onClose}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  const alert = alertTypes[type] || alertTypes.basic;

  return (
    <div className={`${baseStyle} ${alert.bg} text-black`}>
      {alert.icon}
      <div className="flex-1">
        <p className="font-semibold text-black">{title}</p>
        <p className="text-sm text-black">{description}</p>
      </div>
      {closeIcon}
    </div>
  );
};

const Alerts = () => {
  const [alerts, setAlerts] = React.useState([
    {
      id: 1,
      type: 'basic',
      title: 'Alert Title',
      description: 'This is a basic alert.',
    },
    {
      id: 2,
      type: 'success',
      title: 'Success',
      description: 'Your operation was successful!',
    },
    {
      id: 3,
      type: 'info',
      title: 'Info',
      description: 'Be Notice!',
    },
    {
      id: 4,
      type: 'error',
      title: 'Error',
      description: 'Something went wrong.',
    },
    {
      id: 5,
      type: 'warning',
      title: 'Are you sure?',
      description: 'This action cannot be undone.',
    },
  ]);

  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="relative max-h-screen bg-gray-900 overflow-y-auto">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 text-gray-300 font-semibold"
      >
        Logout
      </button>
      <div className="p-6 pt-12 bg-white rounded shadow max-w-md mx-auto mt-6">
        <div className="flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 mr-2 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-700">Alerts</h1>
        </div>
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            type={alert.type}
            title={alert.title}
            description={alert.description}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Alerts;
