import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './styles/global.css';
import Sidebar from './components/Sidebar';
import UserLayout from './components/UserLayout';
import ProfilePerformance from './pages/ProfilePerformance';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Settings from './pages/Settings';
import CustomReport1 from './pages/CustomReport1';
import CustomReport2 from './pages/CustomReport2';
import PostPerformance from './pages/PostPerformance';
import TagPerformance from './pages/TagPerformance';
import TwitterProfiles from './pages/profiles-by-network/TwitterProfiles';
import FacebookProfiles from './pages/profiles-by-network/FacebookProfiles';
import InstagramProfiles from './pages/profiles-by-network/InstagramProfiles';
import LinkedInProfiles from './pages/profiles-by-network/LinkedInProfiles';
/* Removed imports of competitors pages as requested */
// import TwitterCompetitors from './pages/competitors-by-network/TwitterCompetitors';
// import FacebookCompetitors from './pages/competitors-by-network/FacebookCompetitors';
// import InstagramCompetitors from './pages/competitors-by-network/InstagramCompetitors';
// import LinkedInCompetitors from './pages/competitors-by-network/LinkedInCompetitors';
import InternalPerformance from './pages/InternalPerformance';
import CustomizeBranding from './pages/CustomizeBranding';
import Alerts from './pages/Alerts';
import { UserProvider } from './contexts/UserContext';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-white bg-gray-900">Loading...</div>;
  }

  return (
    <Router>
      <>
        {user ? (
          <UserProvider user={user}>
            <UserLayout>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/profile-performance" element={<ProfilePerformance />} />
                <Route path="/custom-reports/report1" element={<CustomReport1 />} />
                <Route path="/custom-reports/report2" element={<CustomReport2 />} />
                <Route path="/post-performance" element={<PostPerformance />} />
                <Route path="/tag-performance" element={<TagPerformance />} />
                <Route path="/profiles-by-network/twitter" element={<TwitterProfiles />} />
                <Route path="/profiles-by-network/facebook" element={<FacebookProfiles />} />
                <Route path="/profiles-by-network/instagram" element={<InstagramProfiles />} />
                <Route path="/profiles-by-network/linkedin" element={<LinkedInProfiles />} />
                {/* Removed competitors routes as requested */}
                {/* <Route path="/competitors-by-network/twitter" element={<TwitterCompetitors />} /> */}
                {/* <Route path="/competitors-by-network/facebook" element={<FacebookCompetitors />} /> */}
                {/* <Route path="/competitors-by-network/instagram" element={<InstagramCompetitors />} /> */}
                {/* <Route path="/competitors-by-network/linkedin" element={<LinkedInCompetitors />} /> */}
                <Route path="/internal-performance" element={<InternalPerformance />} />
                <Route path="/customize-branding" element={<CustomizeBranding />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/alerts" element={<Alerts />} />
              </Routes>
            </UserLayout>
          </UserProvider>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </>
    </Router>
  );
}

export default App;
