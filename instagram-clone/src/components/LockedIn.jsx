import React, { useState, useRef } from 'react';
import { Home, Image, Heart, MessageCircle, Share2, Send, X, PlusSquare, MoreHorizontal, User, BookOpen, Edit3, Save, Mail } from 'lucide-react';

const generateRandomPosts = () => {
  const subjects = ['Mathematics', 'Physics', 'Computer Science', 'Data Science', 'Machine Learning'];
  const users = ['math_wizard', 'science_explorer', 'code_ninja', 'data_sage', 'ai_enthusiast'];
  const contents = [
    'Just discovered a fascinating connection between category theory and neural networks!',
    'Working on a new algorithm for quantum error correction. The results are promising!',
    'Built my first transformer model from scratch. Here\'s what I learned...',
    'Exploring the mathematical foundations of deep learning. Mind = blown 🤯',
    'New paper on advanced optimization techniques. Thoughts?',
    'Created a visualization of high-dimensional data using t-SNE.',
    'Implementing a novel approach to reinforcement learning.',
    'Just solved this complex differential equation. Beautiful solution!',
    'Working on improving gradient descent convergence.',
    'Found an interesting pattern in chaos theory simulations.'
  ];

  return Array.from({ length: 15 }, (_, i) => ({
    id: i + 3,
    user: users[Math.floor(Math.random() * users.length)],
    content: contents[Math.floor(Math.random() * contents.length)],
    subject: subjects[Math.floor(Math.random() * subjects.length)],
    likes: Math.floor(Math.random() * 50),
    comments: [],
    image: `/api/placeholder/${600 + i}/${400 + i}`,
    timestamp: `${Math.floor(Math.random() * 24)}h ago`,
    isRepost: false,
    originalUser: null,
    hasLiked: false
  }));
};

const LockedIn = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'math_wizard',
      content: 'Just solved this fascinating calculus problem! Check out this visualization of a triple integral.',
      subject: 'Mathematics',
      likes: 24,
      comments: [],
      image: '/api/placeholder/600/400',
      timestamp: '2h ago',
      isRepost: false,
      originalUser: null,
      hasLiked: false
    },
    {
      id: 2,
      user: 'science_explorer',
      content: 'Here\'s a great visualization of quantum tunneling effect. What do you think about this phenomenon?',
      subject: 'Physics',
      likes: 18,
      comments: [
        { user: 'quantum_lover', content: 'This is fascinating! Can you explain more about the probability wave function?', timestamp: '1h ago' },
        { user: 'physics_student', content: 'Great visualization! Really helps understand the concept better.', timestamp: '30m ago' }
      ],
      image: '/api/placeholder/600/400',
      timestamp: '4h ago',
      isRepost: false,
      originalUser: null,
      hasLiked: false
    },
    ...generateRandomPosts()
  ]);

  const [userProfile, setUserProfile] = useState({
    username: 'student_123',
    name: 'Alex Johnson',
    bio: 'Computer Science student | Math enthusiast',
    interests: ['Programming', 'Mathematics', 'Physics'],
    education: 'University of Technology',
    posts: [],
    reposts: []
  });

  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: 'tech_guru',
      messages: [
        { id: 1, sender: 'tech_guru', content: 'Hey, saw your post about neural networks!', timestamp: '2h ago' },
        { id: 2, sender: 'student_123', content: 'Thanks! Been studying them a lot lately.', timestamp: '2h ago' },
      ],
      unread: 2
    },
    {
      id: 2,
      user: 'code_master',
      messages: [
        { id: 1, sender: 'code_master', content: 'Would you be interested in collaborating on a project?', timestamp: '1d ago' },
      ],
      unread: 1
    }
  ]);

  const [trendingTopics] = useState([
    { id: 1, topic: 'Quantum Computing', posts: 1234 },
    { id: 2, topic: 'Machine Learning', posts: 987 },
    { id: 3, topic: 'Data Structures', posts: 756 },
    { id: 4, topic: 'Blockchain', posts: 543 },
  ]);

  const [suggestedUsers] = useState([
    { username: 'tech_guru', name: 'Tech Guru', followers: 1200 },
    { username: 'code_master', name: 'Code Master', followers: 980 },
    { username: 'algorithm_wizard', name: 'Algorithm Wizard', followers: 850 },
  ]);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [newPost, setNewPost] = useState({ content: '', subject: '', image: null });
  const [showComments, setShowComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [editingInterest, setEditingInterest] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messageEndRef = useRef(null);

  const handlePost = (e) => {
    e?.preventDefault();
    if (newPost.content && newPost.subject) {
      const post = {
        id: Date.now(),
        user: userProfile.username,
        content: newPost.content,
        subject: newPost.subject,
        image: newPost.image || null,
        likes: 0,
        comments: [],
        timestamp: 'Just now',
        isRepost: false,
        originalUser: null,
        hasLiked: false
      };
      setPosts(prevPosts => [post, ...prevPosts]);
      setUserProfile(prev => ({
        ...prev,
        posts: [post, ...prev.posts]
      }));
      setNewPost({ content: '', subject: '', image: null });
      setIsPostModalOpen(false);
    }
  };

  const handleLike = (e, postId) => {
    e.preventDefault();
    e.stopPropagation();
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !post.hasLiked
        };
      }
      return post;
    }));
  };

  const handleRepost = (e, post) => {
    e.preventDefault();
    e.stopPropagation();
    if (post.isRepost || post.user === userProfile.username) return;
    
    const repost = {
      ...post,
      id: Date.now(),
      isRepost: true,
      originalUser: post.user,
      user: userProfile.username,
      timestamp: 'Just now'
    };
    setPosts(prevPosts => [repost, ...prevPosts]);
    setUserProfile(prev => ({
      ...prev,
      reposts: [repost, ...prev.reposts]
    }));
  };

  const handleComment = (e, postId) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (newComment.trim()) {
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, {
              user: userProfile.username,
              content: newComment,
              timestamp: 'Just now'
            }]
          };
        }
        return post;
      }));
      setNewComment('');
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: Date.now(),
      sender: userProfile.username,
      content: newMessage.trim(),
      timestamp: 'Just now'
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          unread: 0
        };
      }
      return conv;
    }));

    setNewMessage('');
    setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost(prev => ({
        ...prev,
        image: '/api/placeholder/600/400'
      }));
    }
  };

  const handleProfileUpdate = (e) => {
    e?.preventDefault();
    setUserProfile(editedProfile);
    setIsEditProfileOpen(false);
  };

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (editingInterest.trim() && !editedProfile.interests.includes(editingInterest)) {
      setEditedProfile(prev => ({
        ...prev,
        interests: [...prev.interests, editingInterest]
      }));
      setEditingInterest('');
    }
  };

  const handleRemoveInterest = (interest) => {
    setEditedProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  // Continue with the UI components and rendering...

  const PostCard = ({ post }) => (
    <div className="border rounded-lg p-4 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4">
      {post.isRepost && (
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <Share2 className="w-4 h-4" />
          <span>Reposted from @{post.originalUser}</span>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-md">
            {post.user[0].toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">@{post.user}</p>
            <p className="text-sm text-gray-500">{post.subject}</p>
          </div>
        </div>
        <span className="text-sm text-gray-500">{post.timestamp}</span>
      </div>

      <p className="mb-4 text-gray-800">{post.content}</p>
      
      {post.image && (
        <div className="mb-4 rounded-lg overflow-hidden shadow-md">
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full h-auto object-cover"
          />
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
            post.isRepost || post.user === userProfile.username ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={(e) => handleRepost(e, post)}
          disabled={post.isRepost || post.user === userProfile.username}
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

  const EditProfileModal = () => (
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

  const renderMessages = () => (
    <div className="flex h-full">
      {/* Conversations list */}
      <div className="w-72 border-r border-gray-200 bg-white">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-10rem)]">
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`w-full p-4 text-left hover:bg-gray-50 flex items-start gap-3 border-b ${
                selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
                {conv.user[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <p className="font-medium truncate">@{conv.user}</p>
                  <span className="text-xs text-gray-500">
                    {conv.messages[conv.messages.length - 1]?.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {conv.messages[conv.messages.length - 1]?.content}
                </p>
              </div>
              {conv.unread > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col bg-gray-50">
          <div className="p-4 bg-white border-b flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
              {selectedConversation.user[0].toUpperCase()}
            </div>
            <div>
              <h3 className="font-medium">@{selectedConversation.user}</h3>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {selectedConversation.messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === userProfile.username ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === userProfile.username
                        ? 'bg-blue-500 text-white'
                        : 'bg-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-75">{message.timestamp}</p>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                disabled={!newMessage.trim()}
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Select a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );

  // I'll continue with the rest of the code in the next message...

  const renderHome = () => (
    <div className="space-y-4">
      <button
        onClick={() => setIsPostModalOpen(true)}
        className="w-full bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 text-left text-gray-500 flex items-center gap-2"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
          {userProfile.username[0].toUpperCase()}
        </div>
        <span>Share your thoughts...</span>
      </button>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl">
              {userProfile.username[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{userProfile.name}</h2>
              <p className="text-gray-500">@{userProfile.username}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit3 className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-700 mb-4">{userProfile.bio}</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {userProfile.interests.map((interest, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
        <p className="text-gray-600">
          <BookOpen className="w-4 h-4 inline-block mr-2" />
          {userProfile.education}
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Your Posts and Reposts</h3>
        <div className="space-y-4">
          {[...userProfile.posts, ...userProfile.reposts]
            .sort((a, b) => b.id - a.id)
            .map(post => (
              <PostCard key={post.id} post={post} />
          ))}
          {userProfile.posts.length === 0 && userProfile.reposts.length === 0 && (
            <p className="text-gray-500 text-center py-4">No posts or reposts yet</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderRightSidebar = () => (
    <div className="w-64 border-l border-gray-200 bg-white p-4 space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Trending Topics</h3>
        <div className="space-y-2">
          {trendingTopics.map(topic => (
            <div key={topic.id} className="hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
              <p className="font-medium text-sm">{topic.topic}</p>
              <p className="text-xs text-gray-500">{topic.posts} posts</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Suggested Users</h3>
        <div className="space-y-2">
          {suggestedUsers.map(user => (
            <div key={user.username} className="hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm">
                  {user.username[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.followers} followers</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPostModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Post</h2>
          <button onClick={() => setIsPostModalOpen(false)} className="text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <input
          type="text"
          placeholder="Subject"
          className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          value={newPost.subject}
          onChange={(e) => setNewPost({ ...newPost, subject: e.target.value })}
        />

        <textarea
          placeholder="What would you like to share?"
          className="w-full p-2 border rounded-lg mb-4 h-32 resize-none focus:outline-none focus:border-blue-500"
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
          disabled={!newPost.content || !newPost.subject}
        >
          <PlusSquare className="w-5 h-5" />
          Create Post
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className={`${currentPage === 'messages' ? '' : 'max-w-2xl mx-auto'} p-4`}>
          {currentPage === 'home' && renderHome()}
          {currentPage === 'profile' && renderProfile()}
          {currentPage === 'messages' && renderMessages()}
        </div>
      </div>

      {/* Right Sidebar */}
      {currentPage !== 'messages' && renderRightSidebar()}

      {/* Modals */}
      {isPostModalOpen && renderPostModal()}
      {isEditProfileOpen && <EditProfileModal />}
    </div>
  );
};

export default LockedIn;