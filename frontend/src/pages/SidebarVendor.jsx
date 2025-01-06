import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, PlusCircle, Leaf, RefreshCw, Trash2, Package, Upload, Settings } from 'lucide-react';
import { useSidebar } from '../customhooks/useSidebar';

const SidebarVendor = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  const sidebarVariants = {
    open: { width: '240px', transition: { duration: 0.3 } },
    closed: { width: '60px', transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="fixed left-0 top-16 h-full bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-xl text-white"
      initial="open"
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-4 bg-gray-800 rounded-full p-1"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
      <nav className="flex flex-col h-full py-4">
        <SidebarLink to="/homepage/add-field" icon={<PlusCircle />} text="Add Field" isOpen={isOpen} />
        <SidebarLink to="/homepage/add-crop" icon={<Leaf />} text="Add Crop" isOpen={isOpen} />
        <SidebarLink to="/update-status" icon={<RefreshCw />} text="Update/Status" isOpen={isOpen} />
        <SidebarLink to="/delete" icon={<Trash2 />} text="Delete" isOpen={isOpen} />
        <SidebarLink to="/present-stock" icon={<Package />} text="Present Stock" isOpen={isOpen} />
        <SidebarLink to="/upload-image" icon={<Upload />} text="Upload Image" isOpen={isOpen} />
        <SidebarLink to="/settings" icon={<Settings />} text="Settings" isOpen={isOpen} />
      </nav>
    </motion.div>
  );
};

const SidebarLink = ({ to, icon, text, isOpen }) => {
  const linkTextVariants = {
    open: { opacity: 1, display: 'inline-block', transition: { delay: 0.2 } },
    closed: { opacity: 0, display: 'none', transition: { duration: 0.1 } }
  };

  return (
    <Link
      to={to}
      className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition duration-150 ease-in-out"
    >
      <span className="inline-block">{icon}</span>
      <motion.span
        className="ml-4 text-sm font-medium"
        variants={linkTextVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        {text}
      </motion.span>
    </Link>
  );
};

export default SidebarVendor;
