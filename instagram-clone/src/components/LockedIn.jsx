import React, { useState, useRef, useEffect } from 'react';
import { Home, Image, Heart, MessageCircle, Share2, Send, X, PlusSquare, MoreHorizontal, User, BookOpen, Edit3, Save, Mail } from 'lucide-react';
import PostCard from './PostCard';
import MessagePanel from './MessagePanel';
import EditProfileModal from './EditProfileModal';
import CreatePostModal from './CreatePostModal';
import Sidebar from './Sidebar';
import { generateEducationalPosts, initialPosts } from '../utils/generateData';

const realImages = [
  'https://images.unsplash.com/photo-1509475826633-fed577a2c71b',
  'https://images.unsplash.com/photo-1617839625591-e5a789593135',
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
  'https://images.unsplash.com/photo-1509475826633-fed577a2c71b',
  'https://images.unsplash.com/photo-1617839625591-e5a789593135'
];

const LockedIn = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentPosition, setCurrentPosition] = useState(0);
  const [posts, setPosts] = useState([...initialPosts, ...generateEducationalPosts()]);
  const [postType, setPostType] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const messageEndRef = useRef(null);
  
  const [userProfile, setUserProfile] = useState({
    username: 'student_123',
    name: 'Alex Johnson',
    bio: 'Computer Science student | Math enthusiast',
    interests: ['Programming', 'Mathematics', 'Physics'],
    education: 'University of Technology',
    posts: [...initialPosts],
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

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [newPost, setNewPost] = useState({ 
    title: '',
    content: '', 
    subject: '', 
    type: '',
    difficulty: '',
    image: null 
  });
  const [showComments, setShowComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [editingInterest, setEditingInterest] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    setUserProfile(prev => ({
      ...prev,
      posts: posts.filter(post => post.user === prev.username && !post.isRepost),
      reposts: posts.filter(post => post.user === prev.username && post.isRepost)
    }));
  }, [posts]);

  const handlePost = (e) => {
    e?.preventDefault();
    if (newPost.content && newPost.subject && newPost.title && newPost.type && newPost.difficulty) {
      const post = {
        id: Date.now(),
        user: userProfile.username,
        title: newPost.title,
        content: newPost.content,
        subject: newPost.subject,
        type: newPost.type,
        difficulty: newPost.difficulty,
        duration: '30 mins',
        image: newPost.image || realImages[Math.floor(Math.random() * realImages.length)],
        likes: 0,
        comments: [],
        timestamp: 'Just now',
        isRepost: false,
        originalUser: null,
        hasLiked: false,
        resources: []
      };
      setPosts(prevPosts => [post, ...prevPosts]);
      setUserProfile(prev => ({
        ...prev,
        posts: [post, ...prev.posts]
      }));
      setNewPost({ title: '', content: '', subject: '', type: '', difficulty: '', image: null });
      setIsPostModalOpen(false);
    }
  };

  const handleLike = (e, postId) => {
    e.preventDefault();
    e.stopPropagation();
    const currentScroll = window.scrollY;
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
    setTimeout(() => window.scrollTo(0, currentScroll), 0);
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
    const currentScroll = window.scrollY;
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
    setTimeout(() => window.scrollTo(0, currentScroll), 0);
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

    setSelectedConversation(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));

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
        image: realImages[Math.floor(Math.random() * realImages.length)]
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

  const filteredPosts = posts.filter(post => {
    const matchesType = postType === 'all' || post.type === postType;
    const matchesDifficulty = difficulty === 'all' || post.difficulty === difficulty;
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesDifficulty && matchesSearch;
  });

  const renderFilters = () => (
    <div className="sticky top-0 bg-white p-4 shadow-sm z-10 mb-4 rounded-lg">
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search posts..."
          className="flex-1 p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="all">All Types</option>
          <option value="Lecture">Lectures</option>
          <option value="Tutorial">Tutorials</option>
          <option value="Quiz">Quizzes</option>
          <option value="Research Paper">Research Papers</option>
          <option value="Case Study">Case Studies</option>
          <option value="Practice Problem">Practice Problems</option>
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="all">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="space-y-4">
      {renderFilters()}
      <button
        onClick={() => setIsPostModalOpen(true)}
        className="w-full bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 text-left text-gray-500 flex items-center gap-2"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
          {userProfile.username[0].toUpperCase()}
        </div>
        <span>Share your knowledge...</span>
      </button>
      {filteredPosts.map(post => (
        <PostCard 
          key={post.id} 
          post={post}
          handleLike={handleLike}
          handleRepost={handleRepost}
          handleComment={handleComment}
          showComments={showComments}
          setShowComments={setShowComments}
          newComment={newComment}
          setNewComment={setNewComment}
          currentUser={userProfile.username}
        />
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
        <h3 className="text-lg font-semibold mb-4">Your Contributions</h3>
        <div className="space-y-4">
          {[...userProfile.posts, ...userProfile.reposts]
            .sort((a, b) => b.id - a.id)
            .map(post => (
              <PostCard 
                key={post.id} 
                post={post}
                handleLike={handleLike}
                handleRepost={handleRepost}
                handleComment={handleComment}
                showComments={showComments}
                setShowComments={setShowComments}
                newComment={newComment}
                setNewComment={setNewComment}
                currentUser={userProfile.username}
              />
          ))}
          {userProfile.posts.length === 0 && userProfile.reposts.length === 0 && (
            <p className="text-gray-500 text-center py-4">No contributions yet</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        userProfile={userProfile}
      />

      <div className="flex-1 overflow-y-auto">
        <div className={`${currentPage === 'messages' ? '' : 'max-w-2xl mx-auto'} p-4`}>
          {currentPage === 'home' && renderHome()}
          {currentPage === 'profile' && renderProfile()}
          {currentPage === 'messages' && (
            <MessagePanel
              conversations={conversations}
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              messageEndRef={messageEndRef}
              userProfile={userProfile}
            />
          )}
        </div>
      </div>

      {currentPage !== 'messages' && (
        <div className="w-64 border-l border-gray-200 bg-white p-4 space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Popular Topics</h3>
            <div className="space-y-2">
              {[
                { topic: 'Machine Learning', posts: 1234 },
                { topic: 'Algorithms', posts: 987 },
                { topic: 'Quantum Physics', posts: 756 },
                { topic: 'Data Science', posts: 543 }
              ].map((topic, index) => (
                <div key={index} className="hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                  <p className="font-medium text-sm">{topic.topic}</p>
                  <p className="text-xs text-gray-500">{topic.posts} posts</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Top Contributors</h3>
            <div className="space-y-2">
              {[
                { name: 'Prof. Smith', expertise: 'Mathematics' },
                { name: 'Dr. Johnson', expertise: 'Physics' },
                { name: 'Prof. Chen', expertise: 'Computer Science' }
              ].map((user, index) => (
                <div key={index} className="hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.expertise}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isPostModalOpen && (
        <CreatePostModal
          isPostModalOpen={isPostModalOpen}
          setIsPostModalOpen={setIsPostModalOpen}
          newPost={newPost}
          setNewPost={setNewPost}
          handlePost={handlePost}
          handleImageUpload={handleImageUpload}
        />
      )}

      {isEditProfileOpen && (
        <EditProfileModal
          editedProfile={editedProfile}
          setEditedProfile={setEditedProfile}
          handleProfileUpdate={handleProfileUpdate}
          setIsEditProfileOpen={setIsEditProfileOpen}
          editingInterest={editingInterest}
          setEditingInterest={setEditingInterest}
          handleAddInterest={handleAddInterest}
          handleRemoveInterest={handleRemoveInterest}
        />
      )}
    </div>
  );
};

export default LockedIn;