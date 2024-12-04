import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

const MessagePanel = ({ 
  conversations, 
  selectedConversation, 
  setSelectedConversation, 
  newMessage, 
  setNewMessage, 
  handleSendMessage,
  messageEndRef 
}) => (
  <div className="flex h-full">
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
                className={`flex ${message.sender === 'student_123' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'student_123'
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

export default MessagePanel;