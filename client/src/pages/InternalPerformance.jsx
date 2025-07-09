import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { useUser } from '../contexts/UserContext';
import { generateMockData } from '../services/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function InternalPerformance() {
  const user = useUser();
  const [lineData, setLineData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    if (user?.uid) {
      const data = generateMockData(user.uid, 'InternalPerformance');
      setLineData(data.lineData);
      setBarData(data.barData);
      setPieData(data.pieData);
      setMetrics(data.metrics);
    }
  }, [user]);

  if (!lineData || !barData || !pieData || !metrics) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-6">Internal Performance</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Over Time</h2>
          <Line data={lineData} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Product Sales</h2>
          <Bar data={barData} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Traffic Sources</h2>
          <Pie data={pieData} />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-indigo-600 text-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-3xl mt-2">${metrics.totalRevenue.toLocaleString()}</p>
          <p className="mt-1">+15% from last month</p>
        </div>
        <div className="bg-green-600 text-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold">New Customers</h3>
          <p className="text-3xl mt-2">{metrics.newCustomers.toLocaleString()}</p>
          <p className="mt-1">+10% from last month</p>
        </div>
        <div className="bg-yellow-500 text-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold">Support Tickets</h3>
          <p className="text-3xl mt-2">{metrics.supportTickets.toLocaleString()}</p>
          <p className="mt-1">-5% from last month</p>
        </div>
        <div className="bg-red-600 text-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold">Churn Rate</h3>
          <p className="text-3xl mt-2">{metrics.churnRate.toFixed(2)}%</p>
          <p className="mt-1">-0.3% from last month</p>
        </div>
      </section>
    </div>
  );
}

export default InternalPerformance;
