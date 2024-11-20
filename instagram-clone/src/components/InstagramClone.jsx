import React from 'react';
import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, Menu, MoreHorizontal } from 'lucide-react';

const InstagramClone = () => {
  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-gray-200 p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-serif">Instagram</h1>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Home className="w-6 h-6" />
              <span>Home</span>
            </li>
            <li className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Search className="w-6 h-6" />
              <span>Search</span>
            </li>
            <li className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Compass className="w-6 h-6" />
              <span>Explore</span>
            </li>
            <li className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Film className="w-6 h-6" />
              <span>Reels</span>
            </li>
            <li className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <MessageCircle className="w-6 h-6" />
              <span>Messages</span>
            </li>
            <li className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Heart className="w-6 h-6" />
              <span>Notifications</span>
            </li>
            <li className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <PlusSquare className="w-6 h-6" />
              <span>Create</span>
            </li>
          </ul>
        </nav>

        <div className="mt-auto">
          <button className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg w-full">
            <Menu className="w-6 h-6" />
            <span>More</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center flex-col p-8">
          <div className="w-20 h-20 rounded-full border-2 border-pink-500 flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">You're all caught up</h2>
          <p className="text-gray-500 text-sm">You've seen all new posts from the past 3 days.</p>
        </div>

        {/* Suggested Posts */}
        <div className="p-4">
          <h3 className="font-semibold mb-4">Suggested Posts</h3>
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <span className="font-semibold">fstbarbie</span>
                <span className="text-gray-500">• 1d</span>
              </div>
              <button>
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-square bg-gray-100 relative">
              <img 
                src="/api/placeholder/800/800"
                alt="Pink car"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-72 p-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            <div>
              <p className="text-sm font-semibold">coba.cam</p>
              <p className="text-sm text-gray-500">Leonardo Cobaleda</p>
            </div>
          </div>
          <button className="text-blue-500 text-sm font-semibold">Switch</button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500 font-semibold">Suggested for you</span>
            <button className="text-sm font-semibold">See All</button>
          </div>

          <div className="space-y-3">
            {['instagram', '_emmawolman', 'astridcobaleda', 'gseengineeringfl', 'li0vvenataliaa'].map((user) => (
              <div key={user} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="text-sm font-semibold">{user}</p>
                    <p className="text-xs text-gray-500">Suggested for you</p>
                  </div>
                </div>
                <button className="text-blue-500 text-xs font-semibold">Follow</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramClone;