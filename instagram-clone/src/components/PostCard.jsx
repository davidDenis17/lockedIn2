import React from 'react';
import { Heart, MessageCircle, Share2, Send, X, FileText, Video } from 'lucide-react';

const PostCard = ({ post, handleLike, handleRepost, handleComment, showComments, setShowComments, newComment, setNewComment }) => (
  <div className="border rounded-lg p-4 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4">
    {post.isRepost && (
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
        <Share2 className="w-4 h-4" />
        <span>Reposted from @{post.originalUser}</span>
      </div>
    )}
    
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
          {post.user[0].toUpperCase()}
        </div>
        <div>
          <p className="font-semibold">@{post.user}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{post.subject}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              post.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
              post.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {post.difficulty}
            </span>
            <span className="text-xs text-gray-500">⏱ {post.duration}</span>
          </div>
        </div>
      </div>
      <span className="text-sm text-gray-500">{post.timestamp}</span>
    </div>

    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
    <p className="mb-4 text-gray-800">{post.content}</p>
    
    {post.image && (
      <div className="mb-4 rounded-lg overflow-hidden shadow-md">
        <img 
          src={post.image} 
          alt="Post content" 
          className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
    )}

    {post.resources && (
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Learning Resources</h4>
        <div className="flex gap-2">
          {post.resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              {resource.type === 'pdf' ? <FileText className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              {resource.name}
            </a>
          ))}
        </div>
      </div>
    )}

    <div className="flex items-center gap-4 text-gray-500">
      <button 
        className={`flex items-center gap-1 hover:text-blue-500 transition-colors ${post.hasLiked ? 'text-blue-500' : ''}`}
        onClick={(e) => handleLike(e, post.id)}
      >
        <Heart className={`w-5 h-5 ${post.hasLiked ? 'fill-current' : ''}`} />
        <span className="text-sm">{post.likes}</span>
      </button>
      <button 
        className="flex items-center gap-1 hover:text-blue-500 transition-colors"
        onClick={(e) => {
          e.preventDefault();
          setShowComments(prev => prev === post.id ? null : post.id);
        }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm">{post.comments.length}</span>
      </button>
      <button 
        className={`flex items-center gap-1 hover:text-blue-500 transition-colors ${
          post.isRepost || post.user === post.currentUser ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={(e) => handleRepost(e, post)}
        disabled={post.isRepost || post.user === post.currentUser}
      >
        <Share2 className="w-5 h-5" />
      </button>
    </div>

    {showComments === post.id && (
      <div className="mt-4 border-t pt-4">
        <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
          {post.comments.map((comment, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm">
                {comment.user[0].toUpperCase()}
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-3">
                <p className="font-semibold text-sm">@{comment.user}</p>
                <p className="text-sm text-gray-800">{comment.content}</p>
                <p className="text-xs text-gray-500 mt-1">{comment.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => handleComment(e, post.id)} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 p-2 border rounded-lg"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    )}
  </div>
);

export default PostCard;