import React, { useEffect, useState } from 'react';
import { fetchProfileMetrics } from '../services/api';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const profilesList = [
  { id: 1, name: 'Twitter', color: '#14b8a6' },
  { id: 2, name: 'Facebook', color: '#7c3aed' },
  { id: 3, name: 'Instagram', color: '#db2777' },
  { id: 4, name: 'LinkedIn', color: '#facc15' },
];

const postTypesList = ['All', 'Image', 'Video', 'Link', 'Text'];

function ProfilePerformance() {
  const [metrics, setMetrics] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: '2023-10-01',
    end: '2023-10-31',
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProfiles, setSelectedProfiles] = useState(profilesList.map(p => p.name));
  const [selectedPostType, setSelectedPostType] = useState('All');
  const [showProfilesDropdown, setShowProfilesDropdown] = useState(false);
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

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const data = await fetchProfileMetrics();
        console.log('Profile metrics response:', data);
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching profile metrics:', error);
      }
    }
    fetchMetrics();
  }, []);

  if (!metrics) {
    return <div>Loading...</div>;
  }

  const toggleProfile = (profileName) => {
    setSelectedProfiles(prev => {
      if (prev.includes(profileName)) {
        return prev.filter(p => p !== profileName);
      } else {
        return [...prev, profileName];
      }
    });
  };

  const filteredAudienceGrowth = {};
  profilesList.forEach(profile => {
    if (selectedProfiles.includes(profile.name)) {
      filteredAudienceGrowth[profile.name.toLowerCase()] = metrics.audienceGrowth[profile.name.toLowerCase()];
    }
  });

  const data = {
    labels: metrics.dates,
    datasets: profilesList
      .filter(profile => selectedProfiles.includes(profile.name))
      .map(profile => ({
        label: profile.name,
        data: filteredAudienceGrowth[profile.name.toLowerCase()],
        borderColor: profile.color,
        backgroundColor: profile.color,
      })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Profile Performance</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Activity from Oct 1, 2023 - Oct 31, 2023 <span className="text-blue-600 cursor-pointer">(multiple time zones)</span>
          </div>
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
        {/* Profiles Filter */}
        <div className="relative">
          <button
            onClick={() => setShowProfilesDropdown(!showProfilesDropdown)}
            className="flex items-center space-x-1 border border-gray-300 rounded px-3 py-1"
          >
            <span>Profiles</span>
            <svg
              className={`w-4 h-4 transition-transform transform ${showProfilesDropdown ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {showProfilesDropdown && (
            <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded shadow p-2">
              {profilesList.map(profile => (
                <label key={profile.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedProfiles.includes(profile.name)}
                    onChange={() => toggleProfile(profile.name)}
                  />
                  <span>{profile.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

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
        <div className="ml-auto text-sm text-gray-600">
          10/1/23 - 10/31/23 vs 09/1/23 - 09/30/23
        </div>

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

      {/* Tabs */}
      <div className="bg-white rounded shadow">
        <div className="flex border-b border-gray-300">
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === 'overview' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === 'profiles' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('profiles')}
          >
            Profiles
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'overview' && (
            <>
              {/* Performance Summary */}
              <section className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Performance Summary</h2>
                <div className="grid grid-cols-3 gap-4 text-center bg-white p-4 rounded shadow">
                  <div>
                    <div className="text-3xl font-bold">{metrics.impressions.toLocaleString()}</div>
                    <div className="text-gray-600">Impressions <span className="text-green-500 ml-2">↑ 10%</span></div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{metrics.engagements.toLocaleString()}</div>
                    <div className="text-gray-600">Engagements <span className="text-red-500 ml-2">↓ 1.5%</span></div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{metrics.clicks.toLocaleString()}</div>
                    <div className="text-gray-600">Post Link Clicks <span className="text-red-500 ml-2">↓ 1.1%</span></div>
                  </div>
                </div>
              </section>

              {/* Audience Growth */}
              <section>
                <h2 className="text-lg font-semibold mb-4">Audience Growth</h2>
                <Line data={data} options={options} />
                <div className="flex justify-center space-x-6 mt-4 text-sm">
                  {profilesList.map(profile => (
                    <div key={profile.id} className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: profile.color }}></div>
                      <span>{profile.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
          {activeTab === 'profiles' && (
            <div>
              {/* Profiles tab content can be added here */}
              <p>Profiles tab content coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePerformance;
