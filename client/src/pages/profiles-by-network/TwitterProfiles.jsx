import React from 'react';

const mockProfiles = [
  {
    id: 1,
    name: 'John Doe',
    handle: '@johndoe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    followers: 1200,
    tweets: 350,
    bio: 'Tech enthusiast and blogger.',
    location: 'San Francisco, CA',
  },
  {
    id: 2,
    name: 'Jane Smith',
    handle: '@janesmith',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    followers: 980,
    tweets: 420,
    bio: 'Digital marketer and coffee lover.',
    location: 'New York, NY',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    handle: '@bobjohnson',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    followers: 1500,
    tweets: 500,
    bio: 'Photographer and traveler.',
    location: 'Austin, TX',
  },
  {
    id: 4,
    name: 'Alice Cooper',
    handle: '@alicecooper',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    followers: 1100,
    tweets: 300,
    bio: 'Music producer and DJ.',
    location: 'Los Angeles, CA',
  },
  {
    id: 5,
    name: 'David Lee',
    handle: '@davidlee',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    followers: 900,
    tweets: 250,
    bio: 'Entrepreneur and startup advisor.',
    location: 'Seattle, WA',
  },
  {
    id: 6,
    name: 'Emma Watson',
    handle: '@emmawatson',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    followers: 1300,
    tweets: 400,
    bio: 'Actress and activist.',
    location: 'London, UK',
  },
];

function TwitterProfiles() {
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
        <h1 className="text-3xl font-bold">Twitter Profiles</h1>
        <span
          className="text-gray-400 cursor-pointer hover:text-white"
          onClick={handleLogout}
        >
          Logout
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockProfiles.map(profile => (
          <div key={profile.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center space-y-4 hover:shadow-lg transition-shadow">
            <img src={profile.avatar} alt={profile.name} className="w-20 h-20 rounded-full object-cover" />
            <div className="text-center">
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-blue-500">{profile.handle}</p>
              <p className="mt-2 text-gray-600">{profile.bio}</p>
              <p className="text-gray-500 text-sm mt-1">{profile.location}</p>
              <div className="mt-3 flex justify-center space-x-4 text-sm text-gray-700">
                <span>Followers: {profile.followers}</span>
                <span>Tweets: {profile.tweets}</span>
              </div>
              <button className="mt-4 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">Follow</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TwitterProfiles;
