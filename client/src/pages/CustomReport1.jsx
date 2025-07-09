import React from 'react';

const mockData = {
  title: 'Custom Report 1 - Social Media Overview',
  dateRange: 'Oct 1, 2023 - Oct 31, 2023',
  summary: 'This report provides an overview of social media performance across all platforms for the selected date range.',
  metrics: {
    impressions: 150000,
    engagements: 60000,
    clicks: 12000,
  },
  topPosts: [
    { id: 1, title: 'Post 1: Launch Announcement', engagements: 15000 },
    { id: 2, title: 'Post 2: Holiday Sale', engagements: 12000 },
    { id: 3, title: 'Post 3: Customer Testimonial', engagements: 10000 },
  ],
};

function CustomReport1() {
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
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <div className="text-3xl font-bold">{mockData.metrics.impressions.toLocaleString()}</div>
          <div className="text-blue-700">Impressions</div>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <div className="text-3xl font-bold">{mockData.metrics.engagements.toLocaleString()}</div>
          <div className="text-green-700">Engagements</div>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <div className="text-3xl font-bold">{mockData.metrics.clicks.toLocaleString()}</div>
          <div className="text-yellow-700">Clicks</div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Top Posts</h2>
      <ul className="space-y-3">
        {mockData.topPosts.map((post) => (
          <li key={post.id} className="p-4 bg-white rounded shadow hover:shadow-lg transition-shadow">
            <div className="font-semibold">{post.title}</div>
            <div className="text-sm text-gray-600">Engagements: {post.engagements.toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomReport1;
