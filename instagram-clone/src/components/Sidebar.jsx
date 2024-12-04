import React from 'react';
import { Home, Mail, User } from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, userProfile }) => (
  <div className="w-64 border-r border-gray-200 bg-white p-4 flex flex-col">
    <div className="flex items-center gap-2 mb-6">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
        {userProfile.username[0].toUpperCase()}
      </div>
      <div>
        <p className="font-semibold">{userProfile.name}</p>
        <p className="text-sm text-gray-500">@{userProfile.username}</p>
      </div>
    </div>
    <nav className="space-y-2">
      <button
        onClick={() => setCurrentPage('home')}
        className={`w-full flex items-center gap-2 p-2 rounded-lg ${
          currentPage === 'home' ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Home className="w-5 h-5" />
        Home
      </button>
      <button
        onClick={() => setCurrentPage('messages')}
        className={`w-full flex items-center gap-2 p-2 rounded-lg ${
          currentPage === 'messages' ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Mail className="w-5 h-5" />
        Messages
      </button>
      <button
        onClick={() => setCurrentPage('profile')}
        className={`w-full flex items-center gap-2 p-2 rounded-lg ${
          currentPage === 'profile' ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <User className="w-5 h-5" />
        Profile
      </button>
    </nav>
  </div>
);

export default Sidebar;