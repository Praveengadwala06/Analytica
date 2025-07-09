import React from 'react';

const mockProfiles = [
  {
    id: 1,
    name: 'Sophia Lee',
    handle: '@sophialee',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    followers: 2500,
    posts: 300,
    bio: 'Travel and lifestyle blogger.',
    location: 'San Diego, CA',
  },
  {
    id: 2,
    name: 'Liam Martinez',
    handle: '@liammartinez',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    followers: 1800,
    posts: 220,
    bio: 'Fitness coach and nutritionist.',
    location: 'Austin, TX',
  },
  {
    id: 3,
    name: 'Olivia Garcia',
    handle: '@oliviagarcia',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    followers: 3200,
    posts: 400,
    bio: 'Photographer and artist.',
    location: 'New York, NY',
  },
  {
    id: 4,
    name: 'Noah Wilson',
    handle: '@noahwilson',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    followers: 2100,
    posts: 280,
    bio: 'Entrepreneur and tech enthusiast.',
    location: 'Seattle, WA',
  },
  {
    id: 5,
    name: 'Mia Johnson',
    handle: '@miajohnson',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    followers: 2700,
    posts: 350,
    bio: 'Fashion designer and stylist.',
    location: 'Los Angeles, CA',
  },
  {
    id: 6,
    name: 'Ethan Brown',
    handle: '@ethanbrown',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    followers: 1900,
    posts: 230,
    bio: 'Musician and songwriter.',
    location: 'Nashville, TN',
  },
];

function InstagramProfiles() {
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
        <h1 className="text-3xl font-bold">Instagram Profiles</h1>
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
                <span>Posts: {profile.posts}</span>
              </div>
              <button className="mt-4 bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600 transition">Follow</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstagramProfiles;
