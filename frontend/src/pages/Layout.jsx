import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './SideBar';
import { useSidebar } from '../customhooks/useSidebar';

const Layout = () => {
  const { isOpen: isSidebarOpen } = useSidebar();

  return (
    <div className="min-h-screen w-full flex">
      <Sidebar />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-20'}`}>
        <Navbar />
        <div className="mt-16 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;