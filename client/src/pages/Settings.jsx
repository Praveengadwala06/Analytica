import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const [user, setUser] = useState(null);
  const [editableName, setEditableName] = useState('');
  const [editableEmail, setEditableEmail] = useState('');
  const [editablePhone, setEditablePhone] = useState('');
  const [editablePassword, setEditablePassword] = useState('');
  const [message, setMessage] = useState('');
  const [logoutError, setLogoutError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
    if (currentUser) {
      setEditableName(currentUser.displayName || '');
      setEditableEmail(currentUser.email || '');
      setEditablePhone(currentUser.phoneNumber || '');
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would add logic to update user profile info
    setMessage('Settings saved successfully (mock)');
  };

  const handleLogout = async () => {
    setLogoutError('');
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      setLogoutError('Failed to logout. Please try again.');
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="relative max-h-screen bg-gray-900 text-white flex flex-col space-y-4 w-full max-w-screen-xl mx-auto p-4 overflow-y-auto">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 text-gray-300 font-semibold"
      >
        Logout
      </button>
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      {message && <div className="mb-4 text-green-500">{message}</div>}
      {logoutError && <div className="mb-4 text-red-500">{logoutError}</div>}
      <form onSubmit={handleSave} className="bg-gray-800 rounded-lg p-6 max-w-lg space-y-6">
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded px-3 py-2 text-black"
            value={editableName}
            onChange={(e) => setEditableName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded px-3 py-2 text-black"
            value={editableEmail}
            onChange={(e) => setEditableEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1 font-semibold">
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            className="w-full rounded px-3 py-2 text-black"
            value={editablePhone}
            onChange={(e) => setEditablePhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded px-3 py-2 text-black"
            value={editablePassword}
            onChange={(e) => setEditablePassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Notification Preferences</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Email Notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>SMS Notifications</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-2 rounded bg-pink-500 hover:bg-pink-600 text-white font-semibold"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default Settings;

