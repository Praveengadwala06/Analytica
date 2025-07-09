import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { generateMockData } from '../services/mockData';

function ReportsHome() {
  const user = useUser();
  const [mockReports, setMockReports] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      const data = generateMockData(user.uid, 'ReportsHome');
      setMockReports(data);
    } else {
      setMockReports([]);
    }
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Reports Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReports.map((report) => (
          <div key={report.id} className="bg-white rounded shadow p-4 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold mb-2">{report.title}</h2>
            <p className="text-gray-600 mb-4">{report.summary}</p>
            <div className="text-sm text-gray-500 mb-4">Date: {report.date}</div>
            <Link
              to={`/reports/${report.id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Report
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportsHome;
