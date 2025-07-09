import React from 'react';

const mockProfiles = [
  {
    id: 1,
    name: 'Michael Scott',
    handle: 'michael.scott',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    connections: 500,
    posts: 50,
    bio: 'Regional Manager at Dunder Mifflin.',
    location: 'Scranton, PA',
  },
  {
    id: 2,
    name: 'Pam Beesly',
    handle: 'pam.beesly',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    connections: 700,
    posts: 80,
    bio: 'Receptionist and artist.',
    location: 'Scranton, PA',
  },
  {
    id: 3,
    name: 'Jim Halpert',
    handle: 'jim.halpert',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    connections: 650,
    posts: 60,
    bio: 'Salesman and prankster.',
    location: 'Scranton, PA',
  },
  {
    id: 4,
    name: 'Dwight Schrute',
    handle: 'dwight.schrute',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    connections: 400,
    posts: 40,
    bio: 'Assistant to the Regional Manager.',
    location: 'Scranton, PA',
  },
  {
    id: 5,
    name: 'Angela Martin',
    handle: 'angela.martin',
    avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
    connections: 350,
    posts: 30,
    bio: 'Accountant and cat lover.',
    location: 'Scranton, PA',
  },
  {
    id: 6,
    name: 'Kevin Malone',
    handle: 'kevin.malone',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    connections: 300,
    posts: 25,
    bio: 'Accountant and chili enthusiast.',
    location: 'Scranton, PA',
  },
];

function LinkedInProfiles() {
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
        <h1 className="text-3xl font-bold">LinkedIn Profiles</h1>
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
                <span>Connections: {profile.connections}</span>
                <span>Posts: {profile.posts}</span>
              </div>
              <button className="mt-4 bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800 transition">Connect</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LinkedInProfiles;
