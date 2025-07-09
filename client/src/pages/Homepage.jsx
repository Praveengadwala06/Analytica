import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { FaThumbsUp, FaComment, FaShareAlt } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useUser } from '../contexts/UserContext';
import { generateMockData } from '../utils/mockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Homepage() {
  const user = useUser();
  const [insightsType, setInsightsType] = useState('Monthly');
  const [selectedMetric, setSelectedMetric] = useState('accountsReached');
  const [mockData, setMockData] = useState(generateMockData(user?.uid, 'Monthly'));

  // Local state for editable user info in settings
  const [editableName, setEditableName] = useState('');
  const [editablePhone, setEditablePhone] = useState('');
  const [editableLikes, setEditableLikes] = useState('');

  useEffect(() => {
    setMockData(generateMockData(user?.uid, insightsType));
    if (user) {
      setEditableName(user.displayName || '');
      setEditablePhone(user.phoneNumber || '');
      setEditableLikes(mockData.totalLikes);
    }
  }, [user, insightsType]);

  const getChartData = () => {
    switch (selectedMetric) {
      case 'accountsReached':
        return {
          labels: mockData.insights.labels,
          datasets: [
            {
              label: 'Views',
              data: mockData.insights.views,
              backgroundColor: '#f87171', // red-400
            },
            {
              label: 'Followers',
              data: mockData.insights.followers,
              backgroundColor: '#f472b6', // pink-400
            },
          ],
        };
      case 'accountsEngagement':
        return {
          labels: mockData.insights.labels,
          datasets: [
            {
              label: 'Engagement',
              data: mockData.insights.views.map(v => v * 0.7), // mock engagement data
              backgroundColor: '#60a5fa', // blue-400
            },
          ],
        };
      case 'totalLikes':
        return {
          labels: mockData.insights.labels,
          datasets: [
            {
              label: 'Likes',
              data: mockData.insights.views.map(v => v * 1.2), // mock likes data
              backgroundColor: '#fbbf24', // yellow-400
            },
          ],
        };
      case 'totalViews':
        return {
          labels: mockData.insights.labels,
          datasets: [
            {
              label: 'Views',
              data: mockData.insights.views,
              backgroundColor: '#34d399', // green-400
            },
          ],
        };
      default:
        return {
          labels: mockData.insights.labels,
          datasets: [
            {
              label: 'Views',
              data: mockData.insights.views,
              backgroundColor: '#f87171', // red-400
            },
            {
              label: 'Followers',
              data: mockData.insights.followers,
              backgroundColor: '#f472b6', // pink-400
            },
          ],
        };
    }
  };

  const data = getChartData();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { display: false },
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: '#374151' }, // gray-700
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col space-y-6 w-full max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center px-2 md:px-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome Back, {user ? (user.displayName || user.email) : 'User'}{' '}
            <span role="img" aria-label="wave">
              👋
            </span>
          </h1>
          <p className="text-gray-400">Here’s what’s happening with your store today.</p>
        </div>
        <div className="flex items-center space-x-4">
      
          <button className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <img
            src="https://randomuser.me/api/portraits/women/65.jpg"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <span>{user ? (user.displayName || user.email) : 'User'}</span>
          <span
            className="text-gray-400 cursor-pointer hover:text-white"
            onClick={async () => {
              try {
                const { auth } = await import('../firebase');
                await auth.signOut();
                window.location.href = '/login';
              } catch (error) {
                console.error('Logout failed:', error);
              }
            }}
          >
            Logout
          </span>
        </div>
      </div>

      {/* Settings Panel */}
      

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-0 md:px-0">
        <div
          className={"rounded-lg p-4 cursor-pointer " + (selectedMetric === 'accountsReached'
              ? 'bg-gradient-to-r from-pink-400 to-orange-400'
              : 'bg-gray-800')}
          onClick={() => setSelectedMetric('accountsReached')}
        >
          <p className="text-sm">Accounts Reached</p>
          <p className="text-3xl font-bold">{mockData.accountsReached}</p>
          <p className="text-sm text-white/70">
            +8.4K this week <span className="text-green-400">+1.29%</span>
          </p>
        </div>
        <div
          className={"rounded-lg p-4 cursor-pointer " + (selectedMetric === 'accountsEngagement'
              ? 'bg-gradient-to-r from-pink-400 to-orange-400'
              : 'bg-gray-800')}
          onClick={() => setSelectedMetric('accountsEngagement')}
        >
          <p className="text-sm">Accounts Engagement</p>
          <p className="text-3xl font-bold">{mockData.accountsEngagement}</p>
          <p className="text-sm text-white/70">
            +8.4K this week <span className="text-green-400">+1.29%</span>
          </p>
        </div>
        <div
          className={"rounded-lg p-4 cursor-pointer " + (selectedMetric === 'totalLikes'
              ? 'bg-gradient-to-r from-pink-400 to-orange-400'
              : 'bg-gray-800')}
          onClick={() => setSelectedMetric('totalLikes')}
        >
          <p className="text-sm">Total Likes</p>
          <p className="text-3xl font-bold">{mockData.totalLikes}</p>
          <p className="text-sm text-white/70">
            +8.4K this week <span className="text-red-500">-1.29%</span>
          </p>
        </div>
        <div
          className={"rounded-lg p-4 cursor-pointer " + (selectedMetric === 'totalViews'
              ? 'bg-gradient-to-r from-pink-400 to-orange-400'
              : 'bg-gray-800')}
          onClick={() => setSelectedMetric('totalViews')}
        >
          <p className="text-sm">Total Views</p>
          <p className="text-3xl font-bold">{mockData.totalViews}</p>
          <p className="text-sm text-white/70">
            +8.4K this week <span className="text-green-400">+1.29%</span>
          </p>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:space-x-4 px-2 md:px-4">
        <div className="flex-1 order-2 md:order-1">
          <div className="flex items-center mb-4 space-x-4">
            <select
              className="bg-gray-700 text-white rounded px-2 py-1"
              value={insightsType}
              onChange={(e) => setInsightsType(e.target.value)}
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Daily</option>
            </select>
            <h2 className="text-lg font-semibold">Insights</h2>
          </div>
          <div style={{ maxWidth: '900px', maxHeight: '300px' }}>
            <Bar data={data} options={options} />
          </div>
        </div>

        {/* Likes, Comments, Share */}
        <div className="flex flex-col space-y-4 mt-6 md:mt-0 pr-4 md:pr-6 order-first md:order-last">
          <div className="bg-gray-900 rounded-lg p-4 flex items-center space-x-4">
            <div className="bg-gradient-to-r from-pink-400 to-orange-400 p-3 rounded-full">
              <FaThumbsUp className="text-white" size={24} />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm">Likes</p>
              <p className="text-2xl font-bold">{mockData.likesPercent}k</p>
            </div>
            <div className="ml-auto flex items-center justify-center h-12">
              <svg className="w-12 h-12" viewBox="0 0 36 36">
                <circle
                  className="text-gray-700"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                />
                <circle
                  className="text-pink-400"
                  strokeWidth="3"
                strokeDasharray={(mockData.likesPercent / 100) * 100 + ", 100"}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                />
                <text
                  x="18"
                  y="22"
                  fill="white"
                  className="text-white text-sm font-semibold"
                  textAnchor="middle"
                >
                  {mockData.likesPercent}%
                </text>
              </svg>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 flex items-center space-x-4">
            <div className="bg-gradient-to-r from-pink-400 to-orange-400 p-3 rounded-full">
              <FaComment className="text-white" size={24} />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm">Comments</p>
              <p className="text-2xl font-bold">2k</p>
            </div>
            <div className="ml-auto flex items-center justify-center h-12">
              <svg className="w-12 h-12" viewBox="0 0 36 36">
                <circle
                  className="text-gray-700"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                />
                <circle
                  className="text-pink-400"
                  strokeWidth="3"
                strokeDasharray={(mockData.commentsPercent / 100) * 100 + ", 100"}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                />
                <text
                  x="18"
                  y="22"
                  fill="white"
                  className="text-white text-sm font-semibold"
                  textAnchor="middle"
                >
                  {mockData.commentsPercent}%
                </text>
              </svg>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 flex items-center space-x-4">
            <div className="bg-gradient-to-r from-pink-400 to-orange-400 p-3 rounded-full">
              <FaShareAlt className="text-white" size={24} />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm">Share</p>
              <p className="text-2xl font-bold">500k</p>
            </div>
            <div className="ml-auto flex items-center justify-center h-12">
              <svg className="w-12 h-12" viewBox="0 0 36 36">
                <circle
                  className="text-gray-700"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                />
                <circle
                  className="text-pink-400"
                  strokeWidth="3"
                strokeDasharray={(mockData.sharePercent / 100) * 100 + ", 100"}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                />
                <text
                  x="18"
                  y="22"
                  fill="white"
                  className="text-white text-sm font-semibold"
                  textAnchor="middle"
                >
                  {mockData.sharePercent}%
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Post Activity */}
      <div className="bg-gray-800 rounded-lg flex flex-col md:flex-row md:space-x-6 px-4 md:px-6">
        <div className="flex-1 p-6">
          <h2 className="text-lg font-semibold mb-4">Post Activity</h2>
          <table className="w-full text-left text-white">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2">Post</th>
                <th className="py-2">Status</th>
                <th className="py-2">Likes</th>
                <th className="py-2">Impression</th>
                <th className="py-2">Comments</th>
              </tr>
            </thead>
            <tbody>
              {mockData.postActivity.map((post, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-2 flex items-center space-x-2">
                    <img src={post.image} alt={post.post} className="w-10 h-10 rounded" />
                    <span>{post.post}</span>
                  </td>
                  <td className="py-2">{post.status}</td>
                  <td className="py-2">{post.likes}</td>
                  <td className="py-2 text-pink-400">{post.impression}</td>
                  <td className="py-2">{post.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Boast Your Account */}
        <div className="bg-gradient-to-r from-pink-400 to-orange-400 rounded-lg p-6 text-white flex flex-col justify-between max-w-sm mt-6 md:mt-0">
          <h2 className="text-xl font-bold mb-2">Boast Your Account</h2>
          <p className="mb-4">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
          </p>
          <button className="bg-white text-pink-400 font-semibold px-4 py-2 rounded shadow hover:bg-gray-100 transition self-start">
            &rarr;
          </button>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1055/1055646.png"
            alt="Rocket"
            className="w-24 h-24 self-end"
          />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
