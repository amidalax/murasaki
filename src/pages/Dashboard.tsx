import React from 'react';
import { BarChart3, Shield, Activity, Server } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Active Threats',
      value: '24',
      change: '+12%',
      icon: <Shield className="w-6 h-6 text-red-500" />,
    },
    {
      title: 'Systems Monitored',
      value: '156',
      change: '+3%',
      icon: <Server className="w-6 h-6 text-blue-500" />,
    },
    {
      title: 'Threat Models',
      value: '38',
      change: '+24%',
      icon: <BarChart3 className="w-6 h-6 text-purple-500" />,
    },
    {
      title: 'Security Score',
      value: '92%',
      change: '+5%',
      icon: <Activity className="w-6 h-6 text-green-500" />,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-600"> from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-md">
                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New threat model uploaded</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Alerts</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-md">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Suspicious activity detected</p>
                  <p className="text-sm text-gray-500">3 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;