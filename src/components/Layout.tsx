import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  Shield,
  ShieldAlert,
  Upload,
  BarChart3,
  Settings,
  LogOut,
  Menu as MenuIcon,
  X,
} from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const signOut = useAuthStore((state) => state.signOut);

  const menuItems = [
    {
      label: 'Threat Modeling',
      icon: <Shield className="w-5 h-5" />,
      path: '/threat-modeling',
      submenu: [
        { label: 'Upload Opflow', path: '/threat-modeling/upload', icon: <Upload className="w-4 h-4" /> },
        { label: 'Opflow', path: '/threat-modeling', icon: <BarChart3 className="w-4 h-4" /> },
      ],
    },
    {
      label: 'Blue Team',
      icon: <ShieldAlert className="w-5 h-5" />,
      path: '/blue-team',
    },
    {
      label: 'Red Team',
      icon: <ShieldAlert className="w-5 h-5 transform rotate-180" />,
      path: '/red-team',
    },
    {
      label: 'Dashboard',
      icon: <BarChart3 className="w-5 h-5" />,
      path: '/',
    },
    {
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/settings',
      submenu: [
        { label: 'Roles', path: '/settings/roles' },
        { label: 'Devices', path: '/settings/devices' },
        { label: 'Projects', path: '/settings/projects' },
      ],
    },
  ];

  // Close mobile menu when location changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Close button for mobile */}
          <div className="lg:hidden absolute right-2 top-2">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center justify-center h-16 bg-primary-600">
            <h1 className="text-white text-xl font-bold">Murasaki</h1>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 ${
                    location.pathname === item.path ? 'bg-primary-50 text-primary-600' : ''
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
                
                {item.submenu && (
                  <div className="ml-8">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`flex items-center px-6 py-2 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600 ${
                          location.pathname === subItem.path ? 'bg-primary-50 text-primary-600' : ''
                        }`}
                      >
                        {subItem.icon}
                        <span className="ml-3">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          <div className="p-4 border-t">
            <button
              onClick={() => signOut()}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-md"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-50 p-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;