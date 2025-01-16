import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { Users, HardDrive, FolderGit2 } from 'lucide-react';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const tabs = [
    { name: 'Roles', path: '/settings/roles', icon: Users },
    { name: 'Devices', path: '/settings/devices', icon: HardDrive },
    { name: 'Projects', path: '/settings/projects', icon: FolderGit2 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-600">Manage your security platform settings</p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              className={`${
                location.pathname === path
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {name}
            </Link>
          ))}
        </nav>
      </div>

      {children}
    </div>
  );
};

const RolesSettings = () => {
  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">User Roles</h3>
        <div className="mt-4 divide-y divide-gray-200">
          {['Admin', 'Analyst', 'User'].map((role) => (
            <div key={role} className="py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{role}</p>
                <p className="text-sm text-gray-500">Can {role === 'Admin' ? 'manage all aspects' : role === 'Analyst' ? 'view and analyze data' : 'view basic information'}</p>
              </div>
              <button className="text-sm text-primary-600 hover:text-primary-900">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DevicesSettings = () => {
  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Registered Devices</h3>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
            Add Device
          </button>
        </div>
        <div className="mt-4 divide-y divide-gray-200">
          {['Firewall-01', 'IDS-Main', 'SIEM-Server'].map((device) => (
            <div key={device} className="py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{device}</p>
                <p className="text-sm text-gray-500">Last active: 2 minutes ago</p>
              </div>
              <button className="text-sm text-primary-600 hover:text-primary-900">Configure</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectsSettings = () => {
  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Security Projects</h3>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
            New Project
          </button>
        </div>
        <div className="mt-4 divide-y divide-gray-200">
          {['Network Security Audit', 'Web App Penetration Test', 'Cloud Security Review'].map((project) => (
            <div key={project} className="py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{project}</p>
                <p className="text-sm text-gray-500">Created: 3 days ago</p>
              </div>
              <button className="text-sm text-primary-600 hover:text-primary-900">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  return (
    <SettingsLayout>
      <Routes>
        <Route path="/roles" element={<RolesSettings />} />
        <Route path="/devices" element={<DevicesSettings />} />
        <Route path="/projects" element={<ProjectsSettings />} />
      </Routes>
    </SettingsLayout>
  );
};

export default Settings;