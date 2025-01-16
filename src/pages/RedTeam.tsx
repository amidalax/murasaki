import React from 'react';
import { Target, Crosshair, AlertTriangle } from 'lucide-react';

const RedTeam = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Red Team Operations</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Operations</h2>
            <Target className="w-6 h-6 text-red-500" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Operation Phoenix</p>
                  <p className="text-xs text-gray-500">In Progress - Day {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Vulnerabilities Found</h2>
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Critical</span>
              <span className="text-sm font-medium text-red-600">3 Found</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">High</span>
              <span className="text-sm font-medium text-orange-600">7 Found</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Medium</span>
              <span className="text-sm font-medium text-yellow-600">12 Found</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Target Systems</h2>
            <Crosshair className="w-6 h-6 text-blue-500" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Web Applications</span>
              <span className="text-sm font-medium">5 Systems</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Network Infrastructure</span>
              <span className="text-sm font-medium">3 Systems</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cloud Services</span>
              <span className="text-sm font-medium">2 Systems</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Attack Vectors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            'Social Engineering',
            'Network Penetration',
            'Web Application',
            'Physical Security',
            'Wireless Networks',
            'Cloud Infrastructure'
          ].map((vector) => (
            <div key={vector} className="p-4 border rounded-lg hover:border-primary-500 cursor-pointer">
              <h3 className="font-medium text-gray-900">{vector}</h3>
              <p className="text-sm text-gray-500 mt-1">View testing progress and findings</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RedTeam;