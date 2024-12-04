import React from 'react';
import { X, Image, PlusSquare } from 'lucide-react';

const CreatePostModal = ({ 
  isPostModalOpen,
  setIsPostModalOpen,
  newPost,
  setNewPost,
  handlePost,
  handleImageUpload
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-6 max-w-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Create Educational Post</h2>
        <button onClick={() => setIsPostModalOpen(false)} className="text-gray-500">
          <X className="w-6 h-6" />
        </button>
      </div>

      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded-lg mb-4"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />

      <input
        type="text"
        placeholder="Subject"
        className="w-full p-2 border rounded-lg mb-4"
        value={newPost.subject}
        onChange={(e) => setNewPost({ ...newPost, subject: e.target.value })}
      />

      <select
        className="w-full p-2 border rounded-lg mb-4"
        value={newPost.type}
        onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
      >
        <option value="">Select Content Type</option>
        <option value="Lecture">Lecture</option>
        <option value="Tutorial">Tutorial</option>
        <option value="Quiz">Quiz</option>
        <option value="Research Paper">Research Paper</option>
        <option value="Case Study">Case Study</option>
        <option value="Practice Problem">Practice Problem</option>
      </select>

      <select
        className="w-full p-2 border rounded-lg mb-4"
        value={newPost.difficulty}
        onChange={(e) => setNewPost({ ...newPost, difficulty: e.target.value })}
      >
        <option value="">Select Difficulty Level</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <textarea
        placeholder="What would you like to share?"
        className="w-full p-2 border rounded-lg mb-4 h-32 resize-none"
        value={newPost.content}
        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
      />

      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <div className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
            <Image className="w-5 h-5" />
            <span>Add Image</span>
          </div>
        </label>
        {newPost.image && (
          <div className="mt-2 relative">
            <img
              src={newPost.image}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg"
            />
            <button
              onClick={() => setNewPost({ ...newPost, image: null })}
              className="absolute top-2 right-2 bg-white rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handlePost}
        className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 flex items-center justify-center gap-2"
        disabled={!newPost.content || !newPost.subject || !newPost.title || !newPost.type || !newPost.difficulty}
      >
        <PlusSquare className="w-5 h-5" />
        Create Post
      </button>
    </div>
  </div>
);

export default CreatePostModal;