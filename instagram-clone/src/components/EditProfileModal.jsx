import React from 'react';
import { X, Save } from 'lucide-react';

const EditProfileModal = ({ editedProfile, setEditedProfile, handleProfileUpdate, setIsEditProfileOpen, editingInterest, setEditingInterest, handleAddInterest, handleRemoveInterest }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Profile</h2>
        <button onClick={() => setIsEditProfileOpen(false)} className="text-gray-500">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={editedProfile.name}
            onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            value={editedProfile.bio}
            onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
            className="w-full p-2 border rounded-lg h-24 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
          <input
            type="text"
            value={editedProfile.education}
            onChange={(e) => setEditedProfile(prev => ({ ...prev, education: e.target.value }))}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {editedProfile.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(interest)}
                  className="hover:text-blue-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
          <form onSubmit={handleAddInterest} className="flex gap-2">
            <input
              type="text"
              value={editingInterest}
              onChange={(e) => setEditingInterest(e.target.value)}
              placeholder="Add new interest"
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </form>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save Profile
        </button>
      </form>
    </div>
  </div>
);

export default EditProfileModal;