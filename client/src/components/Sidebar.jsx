    import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaFolder,
  FaChartBar,
  FaUser,
  FaUsers,
  FaTwitter,
  FaCog,
  FaFileAlt,
  FaTags,
  FaDollarSign,
  FaStar,
  FaChartLine,
  FaBell,
  FaLink,
  FaQuestionCircle,
  FaKeyboard,
  FaHome,
} from 'react-icons/fa';
import HelpForm from './HelpForm';

// New DataAnalyticsLogo component as placeholder for PNG logo
const DataAnalyticsLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-green-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17v-6a1 1 0 011-1h3m10 7v-4a1 1 0 00-1-1h-3m-4 5v-8a1 1 0 011-1h3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18" />
  </svg>
);

const menuItems = [
  {
    name: 'Home',
    icon: <FaHome />,
    path: '/',
  },
  // Removed Reports Home menu item as requested
  {
    name: 'Custom Reports',
    icon: <FaFileAlt />,
    subItems: [
      { name: 'Custom Report 1', path: '/custom-reports/report1' },
      { name: 'Custom Report 2', path: '/custom-reports/report2' },
    ],
  },
  {
    name: 'Cross-Network Reports',
    icon: <FaChartBar />,
    subItems: [
      { name: 'Profile Performance', path: '/profile-performance' },
      { name: 'Post Performance', path: '/post-performance' },
      { name: 'Tag Performance', path: '/tag-performance' },
    ],
  },
  {
    name: 'Profiles by Network',
    icon: <FaUsers />,
    subItems: [
      { name: 'Twitter Profiles', path: '/profiles-by-network/twitter' },
      { name: 'Facebook Profiles', path: '/profiles-by-network/facebook' },
      { name: 'Instagram Profiles', path: '/profiles-by-network/instagram' },
      { name: 'LinkedIn Profiles', path: '/profiles-by-network/linkedin' },
    ],
  },
  {
    name: 'Paid by Network',
    icon: <FaDollarSign />,
    subItems: [
      { name: 'Twitter Paid', path: '/paid-by-network/twitter' },
      { name: 'Facebook Paid', path: '/paid-by-network/facebook' },
      { name: 'Instagram Paid', path: '/paid-by-network/instagram' },
      { name: 'LinkedIn Paid', path: '/paid-by-network/linkedin' },
    ],
  },
  // Removed Competitors by Network menu item as requested
  // Removed Twitter Analysis menu item as requested
  {
    name: 'Internal Performance',
    icon: <FaChartLine />,
    path: '/internal-performance',
  },
];

// Deduplicate menu items by name
const uniqueMenuItems = Array.from(
  new Map(menuItems.map(item => [item.name, item])).values()
);

function Sidebar() {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const toggleMenu = (name) => {
    setExpandedMenus((prev) => {
      if (prev[name]) {
        const newState = { ...prev };
        delete newState[name];
        return newState;
      }
      return { ...prev, [name]: true };
    });
  };

  const openHelp = () => {
    setIsHelpOpen(true);
  };

  const closeHelp = () => {
    setIsHelpOpen(false);
  };

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700 flex items-center space-x-2">
        <DataAnalyticsLogo />
        <span>Analytica</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {uniqueMenuItems.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={`flex items-center w-full px-3 py-2 rounded hover:bg-gray-700 focus:outline-none ${
                    expandedMenus[item.name] ? 'bg-gray-700 font-semibold' : ''
                  }`}
                >
                  <span className="flex items-center justify-center w-5 mr-3">{item.icon}</span>
                  <span className="flex-1 text-left">{item.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform transform ${
                      expandedMenus[item.name] ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
                {expandedMenus[item.name] && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={sub.path}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded hover:bg-gray-700 ${
                            isActive ? 'bg-gray-700 font-semibold' : ''
                          }`
                        }
                      >
                        {sub.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700 font-semibold' : ''
                  }`
                }
              >
                <span className="flex items-center justify-center w-5 mr-3">{item.icon}</span>
                <span className="flex-1 text-left">{item.name}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700 space-y-2">
        <NavLink
          to="/alerts"
          className={({ isActive }) =>
            `w-full flex items-center px-3 py-2 rounded hover:bg-gray-700 ${
              isActive ? 'bg-gray-700 font-semibold' : ''
            }`
          }
        >
          <FaBell className="mr-3" />
          Alerts
        </NavLink>
        <button
          className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-700"
          onClick={openHelp}
        >
          <FaQuestionCircle className="mr-3" />
          Help
        </button>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `block w-full px-3 py-2 rounded hover:bg-gray-700 text-left ${
              isActive ? 'bg-gray-700 font-semibold' : ''
            }`
          }
        >
          Settings
        </NavLink>
      </div>
      <HelpForm isOpen={isHelpOpen} onClose={closeHelp} />
    </aside>
  );
}

export default Sidebar;
