import React from 'react';

const mockProfiles = [
  {
    id: 1,
    name: 'Alice Brown',
    handle: 'alice.brown',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    friends: 800,
    posts: 120,
    bio: 'Loves cooking and traveling.',
    location: 'Chicago, IL',
  },
  {
    id: 2,
    name: 'David Wilson',
    handle: 'david.wilson',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    friends: 950,
    posts: 200,
    bio: 'Tech geek and gamer.',
    location: 'Denver, CO',
  },
  {
    id: 3,
    name: 'Emma Davis',
    handle: 'emma.davis',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    friends: 1100,
    posts: 180,
    bio: 'Fitness enthusiast and blogger.',
    location: 'Miami, FL',
  },
  {
    id: 4,
    name: 'Mark Taylor',
    handle: 'mark.taylor',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    friends: 700,
    posts: 90,
    bio: 'Photographer and artist.',
    location: 'Portland, OR',
  },
  {
    id: 5,
    name: 'Sophia Green',
    handle: 'sophia.green',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    friends: 1200,
    posts: 210,
    bio: 'Entrepreneur and writer.',
    location: 'Boston, MA',
  },
  {
    id: 6,
    name: 'James White',
    handle: 'james.white',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    friends: 850,
    posts: 150,
    bio: 'Musician and composer.',
    location: 'Nashville, TN',
  },
];

function FacebookProfiles() {
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
        <h1 className="text-3xl font-bold">Facebook Profiles</h1>
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
                <span>Friends: {profile.friends}</span>
                <span>Posts: {profile.posts}</span>
              </div>
              <button className="mt-4 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">Add Friend</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacebookProfiles;
