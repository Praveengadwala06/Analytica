import React from 'react';

function TwitterPaid() {
  const handleLogout = async () => {
    try {
      const { auth } = await import('../../firebase');
      await auth.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Twitter Paid</h1>
        <span
          className="text-gray-400 cursor-pointer hover:text-white"
          onClick={handleLogout}
        >
          Logout
        </span>
      </div>
      <p>This is a placeholder page for Twitter Paid network data.</p>
    </div>
  );
}

export default TwitterPaid;
