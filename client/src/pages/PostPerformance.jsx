import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useUser } from '../contexts/UserContext';
import { generateMockData } from '../services/mockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function PostPerformance() {
  const user = useUser();
  const [selectedPostType, setSelectedPostType] = useState('All');
  const [showPostTypesDropdown, setShowPostTypesDropdown] = useState(false);
  const [postsList, setPostsList] = useState([]);
  const [data, setData] = useState(null);

  const handleLogout = async () => {
    try {
      const { auth } = await import('../firebase');
      await auth.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
  };

  useEffect(() => {
    if (user?.uid) {
      const mockData = generateMockData(user.uid, 'PostPerformance');
      setPostsList(mockData.postsList || []);
      setData(mockData.data || null);
    }
  }, [user]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Post Performance</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">Activity from Oct 1, 2023 - Oct 31, 2023</div>
          <span
            className="text-gray-400 cursor-pointer hover:text-white"
            onClick={handleLogout}
          >
            Logout
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center space-x-4 bg-white p-4 rounded shadow">
        {/* Post Types Filter */}
        <div className="relative">
          <button
            onClick={() => setShowPostTypesDropdown(!showPostTypesDropdown)}
            className="flex items-center space-x-1 border border-gray-300 rounded px-3 py-1"
          >
            <span>Post Types: {selectedPostType}</span>
            <svg
              className={`w-4 h-4 transition-transform transform ${showPostTypesDropdown ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {showPostTypesDropdown && (
            <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded shadow p-2">
              {['All', 'Image', 'Video', 'Link', 'Text'].map((type) => (
                <div
                  key={type}
                  className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                  onClick={() => {
                    setSelectedPostType(type);
                    setShowPostTypesDropdown(false);
                  }}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date Range */}
        <div className="ml-auto text-sm text-gray-600">10/1/23 - 10/31/23 vs 09/1/23 - 09/30/23</div>

        {/* Share and Filters Buttons */}
        <button className="ml-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">Share</button>
        <button className="ml-2 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 flex items-center space-x-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Filters</span>
        </button>
      </div>

      {/* Performance Summary */}
      <section className="bg-white p-4 rounded shadow grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-3xl font-bold">{data.datasets[0].data.reduce((a, b) => a + b, 0)}</div>
          <div className="text-gray-600">
            Impressions <span className="text-green-500 ml-2">↑ 10%</span>
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold">{data.datasets[0].data.reduce((a, b) => a + b, 0) * 0.5}</div>
          <div className="text-gray-600">
            Engagements <span className="text-red-500 ml-2">↓ 1.5%</span>
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold">{data.datasets[1].data.reduce((a, b) => a + b, 0)}</div>
          <div className="text-gray-600">
            Post Link Clicks <span className="text-red-500 ml-2">↓ 1.1%</span>
          </div>
        </div>
      </section>

      {/* Chart */}
      <section className="bg-white p-4 rounded shadow">
        <Bar options={options} data={data} />
      </section>
    </div>
  );
}

export default PostPerformance;

