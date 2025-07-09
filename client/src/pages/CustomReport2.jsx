import React from 'react';

const mockData = {
  title: 'Custom Report 2 - Audience Growth Analysis',
  dateRange: 'Oct 1, 2023 - Oct 31, 2023',
  summary: 'This report analyzes audience growth trends across social media platforms for the selected period.',
  growthData: {
    twitter: [100, 150, 200, 250, 300, 350, 400],
    facebook: [80, 120, 160, 200, 240, 280, 320],
    instagram: [90, 130, 170, 210, 250, 290, 330],
    linkedin: [70, 110, 150, 190, 230, 270, 310],
    dates: ['10/01', '10/05', '10/10', '10/15', '10/20', '10/25', '10/30'],
  },
};

function CustomReport2() {
  const handleLogout = async () => {
    try {
      const { auth } = await import('../firebase');
      await auth.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <span
          className="text-gray-400 cursor-pointer hover:text-white"
          onClick={handleLogout}
        >
          Logout
        </span>
      </div>
      <h1 className="text-2xl font-semibold mb-4">{mockData.title}</h1>
      <div className="text-gray-600 mb-6">Date Range: {mockData.dateRange}</div>
      <p className="mb-6">{mockData.summary}</p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Twitter</th>
              <th className="py-2 px-4 border-b">Facebook</th>
              <th className="py-2 px-4 border-b">Instagram</th>
              <th className="py-2 px-4 border-b">LinkedIn</th>
            </tr>
          </thead>
          <tbody>
            {mockData.growthData.dates.map((date, index) => (
              <tr key={date} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-2 px-4 border-b">{date}</td>
                <td className="py-2 px-4 border-b text-center">{mockData.growthData.twitter[index]}</td>
                <td className="py-2 px-4 border-b text-center">{mockData.growthData.facebook[index]}</td>
                <td className="py-2 px-4 border-b text-center">{mockData.growthData.instagram[index]}</td>
                <td className="py-2 px-4 border-b text-center">{mockData.growthData.linkedin[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomReport2;
