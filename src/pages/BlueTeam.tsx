import React from 'react';
import { Shield, Server, AlertCircle } from 'lucide-react';

const BlueTeam = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Blue Team Operations</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
            <Shield className="w-6 h-6 text-green-500" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Firewalls</span>
              <span className="text-sm font-medium text-green-600">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">IDS/IPS</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">SIEM</span>
              <span className="text-sm font-medium text-yellow-600">Maintenance</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Defenses</h2>
            <Server className="w-6 h-6 text-blue-500" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">WAF Rules</span>
              <span className="text-sm font-medium">1,245 Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Network Segments</span>
              <span className="text-sm font-medium">8 Secured</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Endpoints</span>
              <span className="text-sm font-medium">156 Protected</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Unauthorized Access Attempt</p>
                  <p className="text-xs text-gray-500">10 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Access Control', 'Network Security', 'Endpoint Protection', 'Data Security', 'Identity Management', 'Incident Response'].map((control) => (
            <div key={control} className="p-4 border rounded-lg hover:border-primary-500 cursor-pointer">
              <h3 className="font-medium text-gray-900">{control}</h3>
              <p className="text-sm text-gray-500 mt-1">View detailed status and configurations</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlueTeam;