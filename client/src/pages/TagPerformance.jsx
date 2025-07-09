import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const tagsList = ['Tag A', 'Tag B', 'Tag C', 'Tag D', 'Tag E'];
const postTypesList = ['All', 'Image', 'Video', 'Link', 'Text'];

function TagPerformance() {
  const [selectedPostType, setSelectedPostType] = useState('All');
  const [showPostTypesDropdown, setShowPostTypesDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      const { auth } = await import('../firebase');
      await auth.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const data = {
    labels: tagsList,
    datasets: [
      {
        label: 'Tag Usage',
        data: [300, 50, 100, 75, 125],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: false },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Tag Performance</h1>
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
              {postTypesList.map(type => (
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
          <div className="text-3xl font-bold">550</div>
          <div className="text-gray-600">
            Tags Used <span className="text-green-500 ml-2">↑ 5%</span>
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold">120</div>
          <div className="text-gray-600">
            Unique Tags <span className="text-green-500 ml-2">↑ 2%</span>
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold">75</div>
          <div className="text-gray-600">
            Top Tag Usage <span className="text-green-500 ml-2">↑ 8%</span>
          </div>
        </div>
      </section>

      {/* Chart */}
      <section className="bg-white p-4 rounded shadow">
        <Pie data={data} options={options} />
      </section>
    </div>
  );
}

export default TagPerformance;
